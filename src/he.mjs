/*! https://mths.be/he by @mathias | MIT license */

import {
	decodeMap,
	decodeMapLegacy,
	decodeMapNumeric,
	encodeMap,
	invalidReferenceCodePoints,
	regexAsciiWhitelist,
	regexAstralSymbols,
	regexBmpWhitelist,
	regexDecode,
	regexEncodeNonAscii,
	regexInvalidRawCodePoint,
} from './data.mjs';

const regexEscape = /["&'<>`]/g;
const escapeMap = new Map([
	['"', '&quot;'],
	['&', '&amp;'],
	["'", '&#x27;'],
	['<', '&lt;'],
	// See https://mathiasbynens.be/notes/ambiguous-ampersands: in HTML, the
	// following is not strictly necessary unless it’s part of a tag or an
	// unquoted attribute value. We’re only escaping it to support those
	// situations, and for XML support.
	['>', '&gt;'],
	// In Internet Explorer ≤ 8, the backtick character can be used
	// to break out of (un)quoted attribute values or HTML comments.
	// See http://html5sec.org/#102, http://html5sec.org/#108, and
	// http://html5sec.org/#133.
	['`', '&#x60;'],
]);

const regexInvalidEntity = /&#(?:[xX][^a-fA-F0-9]|[^0-9xX])/;

/*--------------------------------------------------------------------------*/

const has = (object, propertyName) => Object.hasOwn(object, propertyName);

const merge = (options, defaults) => {
	if (!options) {
		return defaults;
	}
	const result = {};
	for (const key in defaults) {
		// A `hasOwnProperty` check is not needed here, since only recognized
		// option names are used anyway. Any others are ignored.
		result[key] = has(options, key) ? options[key] : defaults[key];
	}
	return result;
};

const parseError = (message) => {
	throw new Error(`Parse error: ${message}`);
};

// Converts a code point to a symbol, applying the HTML spec’s rules for
// numeric character references.
const codePointToSymbol = (codePoint, strict) => {
	if ((codePoint >= 0xd800 && codePoint <= 0xdfff) || codePoint > 0x10ffff) {
		// See issue #4:
		// “Otherwise, if the number is in the range 0xD800 to 0xDFFF or is
		// greater than 0x10FFFF, then this is a parse error. Return a U+FFFD
		// REPLACEMENT CHARACTER.”
		if (strict) {
			parseError('character reference outside the permissible Unicode range');
		}
		return '\uFFFD';
	}
	if (decodeMapNumeric.has(codePoint)) {
		if (strict) {
			parseError('disallowed character reference');
		}
		return decodeMapNumeric.get(codePoint);
	}
	if (strict && invalidReferenceCodePoints.has(codePoint)) {
		parseError('disallowed character reference');
	}
	return String.fromCodePoint(codePoint);
};

const hexEscape = (codePoint) => {
	return `&#x${codePoint.toString(16).toUpperCase()};`;
};

const decEscape = (codePoint) => {
	return `&#${codePoint};`;
};

/*--------------------------------------------------------------------------*/

const encode = (string, options) => {
	options = merge(options, encode.options);
	const strict = options.strict;
	if (strict && regexInvalidRawCodePoint.test(string)) {
		parseError('forbidden code point');
	}
	const encodeEverything = options.encodeEverything;
	const useNamedReferences = options.useNamedReferences;
	const allowUnsafeSymbols = options.allowUnsafeSymbols;
	const escapeCodePoint = options.decimal ? decEscape : hexEscape;

	const escapeBmpSymbol = (symbol) => {
		return escapeCodePoint(symbol.charCodeAt(0));
	};

	if (encodeEverything) {
		// Encode ASCII symbols.
		string = string.replace(regexAsciiWhitelist, (symbol) => {
			// Use named references if requested & possible.
			if (useNamedReferences && encodeMap.has(symbol)) {
				return `&${encodeMap.get(symbol)};`;
			}
			return escapeBmpSymbol(symbol);
		});
		// Shorten a few escapes that represent two symbols, of which at least one
		// is within the ASCII range.
		if (useNamedReferences) {
			string = string
				.replace(/&gt;\u20D2/g, '&nvgt;')
				.replace(/&lt;\u20D2/g, '&nvlt;')
				.replace(/&#x66;&#x6A;/g, '&fjlig;');
		}
		// Encode non-ASCII symbols.
		if (useNamedReferences) {
			// Encode non-ASCII symbols that can be replaced with a named reference.
			string = string.replace(regexEncodeNonAscii, (string) => {
				// Note: there is no need to check `encodeMap.has(string)` here.
				return `&${encodeMap.get(string)};`;
			});
		}
		// Note: any remaining non-ASCII symbols are handled outside of the `if`.
	} else if (useNamedReferences) {
		// Apply named character references.
		// Encode `<>"'&` using named character references.
		if (!allowUnsafeSymbols) {
			string = string.replace(regexEscape, (string) => {
				// Note: there is no need to check `encodeMap.has(string)` here.
				return `&${encodeMap.get(string)};`;
			});
		}
		// Shorten escapes that represent two symbols, of which at least one is
		// `<>"'&`.
		string = string
			.replace(/&gt;\u20D2/g, '&nvgt;')
			.replace(/&lt;\u20D2/g, '&nvlt;');
		// Encode non-ASCII symbols that can be replaced with a named reference.
		string = string.replace(regexEncodeNonAscii, (string) => {
			// Note: there is no need to check `encodeMap.has(string)` here.
			return `&${encodeMap.get(string)};`;
		});
	} else if (!allowUnsafeSymbols) {
		// Encode `<>"'&` using hexadecimal escapes, now that they’re not handled
		// using named character references.
		string = string.replace(regexEscape, escapeBmpSymbol);
	}
	return (
		string
			// Encode astral symbols.
			.replace(regexAstralSymbols, ($0) => {
				// https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
				const high = $0.charCodeAt(0);
				const low = $0.charCodeAt(1);
				const codePoint = (high - 0xd800) * 0x400 + low - 0xdc00 + 0x10000;
				return escapeCodePoint(codePoint);
			})
			// Encode any remaining BMP symbols that are not printable ASCII symbols
			// using a hexadecimal escape.
			.replace(regexBmpWhitelist, escapeBmpSymbol)
	);
};
// Expose default options (so they can be overridden globally).
encode.options = {
	allowUnsafeSymbols: false,
	encodeEverything: false,
	strict: false,
	useNamedReferences: false,
	decimal: false,
};

const decode = (html, options) => {
	options = merge(options, decode.options);
	const strict = options.strict;
	if (strict && regexInvalidEntity.test(html)) {
		parseError('malformed character reference');
	}
	return html.replace(regexDecode, ($0, $1, $2, $3, $4, $5, $6, $7) => {
		if ($1) {
			// Note: there is no need to check `decodeMap.has($1)`.
			return decodeMap.get($1);
		}

		if ($2) {
			// Decode named character references without trailing `;`, e.g. `&amp`.
			// This is only a parse error if it gets converted to `&`, or if it is
			// followed by `=` in an attribute context.
			const reference = $2;
			const next = $3;
			if (next && options.isAttributeValue) {
				if (strict && next == '=') {
					parseError('`&` did not start a character reference');
				}
				return $0;
			}
			if (strict) {
				parseError(
					'named character reference was not terminated by a semicolon',
				);
			}
			// Note: there is no need to check `decodeMapLegacy.has(reference)`.
			return decodeMapLegacy.get(reference) + (next || '');
		}

		if ($4) {
			// Decode decimal escapes, e.g. `&#119558;`.
			const semicolon = $5;
			if (strict && !semicolon) {
				parseError('character reference was not terminated by a semicolon');
			}
			return codePointToSymbol(parseInt($4, 10), strict);
		}

		if ($6) {
			// Decode hexadecimal escapes, e.g. `&#x1D306;`.
			const semicolon = $7;
			if (strict && !semicolon) {
				parseError('character reference was not terminated by a semicolon');
			}
			return codePointToSymbol(parseInt($6, 16), strict);
		}

		// If we’re still here, the ambiguous ampersand group matched; it’s an
		// ambiguous ampersand for sure. https://mths.be/notes/ambiguous-ampersands
		if (strict) {
			parseError('named character reference was not recognized');
		}
		return $0;
	});
};
// Expose default options (so they can be overridden globally).
decode.options = {
	isAttributeValue: false,
	strict: false,
};

const escape = (string) => {
	return string.replace(regexEscape, ($0) => {
		// Note: there is no need to check `escapeMap.has($0)` here.
		return escapeMap.get($0);
	});
};

export { decode, encode, escape, decode as unescape };
