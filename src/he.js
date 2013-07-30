/*! http://mths.be/he v<%= version %> by @mathias */
;(function(root) {

	// Detect free variables `exports`
	var freeExports = typeof exports == 'object' && exports;

	// Detect free variable `module`
	var freeModule = typeof module == 'object' && module &&
		module.exports == freeExports && module;

	// Detect free variable `global`, from Node.js or Browserified code,
	// and use it as `root`
	var freeGlobal = typeof global == 'object' && global;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/*--------------------------------------------------------------------------*/

	var regexAstralSymbols = /<%= astralSymbols %>/g;
	var regexNonASCII = /[^\0-\x7F]/g;

	var regexEncode = /<%= encodeMultipleSymbols %>|<%= encodeSingleSymbols %>/g;
	var encodeMap = <%= encodeMap %>;

	var regexEscape = /[&<>"']/g;
	var escapeMap = {
		'&': '&amp;',
		'<': '&lt;',
		'"': '&quot;',
		'\'': '&#x27;',
		// See http://mathiasbynens.be/notes/ambiguous-ampersands: in HTML, the
		// following is not strictly necessary unless it’s part of a tag or an
		// unquoted attribute value. We’re only escaping it for XML support, and to
		// match existing `htmlEscape` implementations.
		'>': '&gt;'
	};

	var regexInvalidEntity = /&#(?:[xX][^a-fA-F0-9]|[^0-9xX])/;
	var regexDecimalEscape = /&#([0-9]+)(;?)/g;
	var regexHexadecimalEscape = /&#[xX]([a-fA-F0-9]+)(;?)/g;
	var regexNamedReference = /&([0-9a-zA-Z]+);/g;
	var regexLegacyReference = /&(<%= legacyReferences %>)([=a-zA-Z0-9])?/g;
	var regexDecode = RegExp(
		regexDecimalEscape.source + '|' +
		regexHexadecimalEscape.source + '|' +
		regexNamedReference.source + '|' +
		regexLegacyReference.source,
		'g'
	);
	var decodeMap = <%= decodeMap %>;
	var decodeMapLegacy = <%= decodeMapLegacy %>;
	var decodeMapNumeric = <%= decodeOverrides %>;
	var invalidCodePoints = <%= invalidCodePoints %>;

	/*--------------------------------------------------------------------------*/

	var stringFromCharCode = String.fromCharCode;

	var object = {};
	var hasOwnProperty = object.hasOwnProperty;
	var has = function(object, propertyName) {
		return hasOwnProperty.call(object, propertyName);
	};

	var contains = function(array, value) {
		var index = -1;
		var length = array.length;
		while (++index < length) {
			if (array[index] == value) {
				return true;
			}
		}
		return false;
	};

	var merge = function(options, defaults) {
		if (!options) {
			return defaults;
		}
		var key;
		var result = {};
		for (key in defaults) {
			// `hasOwnProperty` check is not needed here, since only recognized
			// option names are used
			result[key] = has(options, key) ? options[key] : defaults[key];
		}
		return result;
	};

	// Modified version of `ucs2encode`; see http://mths.be/punycode
	var codePointToSymbol = function(codePoint, strict) {
		var output = '';
		if ((codePoint >= 0xD800 && codePoint <= 0xDFFF) || codePoint > 0x10FFFF) {
			// See issue #4:
			// “Otherwise, if the number is in the range 0xD800 to 0xDFFF or is
			// greater than 0x10FFFF, then this is a parse error. Return a U+FFFD
			// REPLACEMENT CHARACTER.”
			if (strict) {
				parseError();
			}
			return '\uFFFD';
		}
		if (strict && contains(invalidCodePoints, codePoint)) {
			parseError();
		}
		if (has(decodeMapNumeric, codePoint)) {
			return decodeMapNumeric[codePoint];
		}
		if (codePoint > 0xFFFF) {
			codePoint -= 0x10000;
			output += stringFromCharCode(codePoint >>> 10 & 0x3FF | 0xD800);
			codePoint = 0xDC00 | codePoint & 0x3FF;
		}
		output += stringFromCharCode(codePoint);
		return output;
	};

	var hexEscape = function(symbol) {
		return '&#x' + symbol.charCodeAt(0).toString(16).toUpperCase() + ';';
	};

	var parseError = function(message) {
		throw Error('Parse error: ' + message);
	};

	/*--------------------------------------------------------------------------*/

	var encode = function(string, options) {
		options = merge(options, encode.options);
		if (options.useNamedReferences) {
			// Apply named character references
			string = string.replace(regexEncode, function($0) {
				return '&' + encodeMap[$0] + ';'; // no need to check `has()` here
			});
		} else {
			// Encode `<>"'&` using hexadecimal escapes, now that they’re not handled
			// using named character references
			string = string.replace(regexEscape, hexEscape);
		}
		return string
			// Encode astral symbols
			.replace(regexAstralSymbols, function($0) {
				// http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
				var high = $0.charCodeAt(0);
				var low = $0.charCodeAt(1);
				var codePoint = (high - 0xD800) * 0x400 + low - 0xDC00 + 0x10000;
				return '&#x' + codePoint.toString(16).toUpperCase() + ';';
			})
			// Encode any remaining non-ASCII symbols using a hexadecimal escape
			.replace(regexNonASCII, hexEscape);
	};
	// Expose default options (so they can be overridden globally)
	encode.options = {
		'useNamedReferences': false
	};

	var decode = function(html, options) {
		options = merge(options, decode.options);
		var strict = options.strict;
		if (strict && regexInvalidEntity.test(html)) {
			parseError('malformed character reference');
		}
		// regexDecimalEscape | regexHexadecimalEscape | regexNamedReference | regexLegacyReference
		return html.replace(regexDecode, function($0, $1, $2, $3, $4, $5, $6, $7) {
			if ($0.match(regexDecimalEscape)) {
				// Decode decimal escapes, e.g. `&#119558;`
				var codePoint = $1;
				var semicolon = $2;
				if (strict && !semicolon) {
					parseError('character reference was not terminated by a semicolon');
				}
				return codePointToSymbol(codePoint, strict);
			}
			if ($0.match(regexHexadecimalEscape)) {
				// Decode hexadecimal escapes, e.g. `&#x1D306;`
				var hexDigits = $3;
				var semicolon = $4;
				if (strict && !semicolon) {
					parseError('character reference was not terminated by a semicolon');
				}
				var codePoint = parseInt(hexDigits, 16);
				return codePointToSymbol(codePoint, strict);
			}
			if ($0.match(regexNamedReference)) {
				// Decode named character references with trailing `;`, e.g. `&copy;`
				var reference = $5;
				if (has(decodeMap, reference)) {
					return decodeMap[reference];
				} else {
					// ambiguous ampersand; see http://mths.be/notes/ambiguous-ampersands
					if (strict) {
						parseError(
							'named character reference was not terminated by a semicolon'
						);
					}
					return $0;
				}
			}
			if ($0.match(regexLegacyReference)) {
				// Decode named character references without trailing `;`, e.g. `&amp`
				// This is only a parse error if it gets converted to `&`, or if it is
				// followed by `=` in an attribute context.
				var reference = $6;
				var next = $7;
				if (next && options.isAttributeValue) {
					if (strict && next == '=') {
						parseError('`&` did not start a character reference');
					}
					return $0;
				} else {
					if (strict) {
						parseError(
							'named character reference was not terminated by a semicolon'
						);
					}
					// no need to check `has()` here
					return decodeMapLegacy[reference] + (next || '');
				}
			}
		});
	}
	// Expose default options (so they can be overridden globally)
	decode.options = {
		'isAttributeValue': false,
		'strict': false
	};

	var escape = function(string) {
		return string.replace(regexEscape, function($0) {
			return escapeMap[$0]; // no need to check `has()` here
		});
	};

	/*--------------------------------------------------------------------------*/

	var he = {
		'version': '<%= version %>',
		'encode': encode,
		'decode': decode,
		'escape': escape,
		'unescape': decode
	};

	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		typeof define == 'function' &&
		typeof define.amd == 'object' &&
		define.amd
	) {
		define(function() {
			return he;
		});
	}	else if (freeExports && !freeExports.nodeType) {
		if (freeModule) { // in Node.js or RingoJS v0.8.0+
			freeModule.exports = he;
		} else { // in Narwhal or RingoJS v0.7.0-
			for (var key in he) {
				has(he, key) && (freeExports[key] = he[key]);
			}
		}
	} else { // in Rhino or a web browser
		root.he = he;
	}

}(this));
