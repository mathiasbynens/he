import jsesc from 'jsesc';
import regenerate from 'regenerate';
import loneCodePoints from '../data/encode-lone-code-points.json' with { type: 'json' };
import arrayEncodeMultipleSymbols from '../data/encode-paired-symbols.json' with { type: 'json' };

const joinStrings = (a, b) => {
	if (a && b) {
		return `${a}|${b}`;
	}
	return a + b;
};

const arrayEncodeMultipleSymbolsAscii = arrayEncodeMultipleSymbols.filter(
	(string) => /^[\0-\x7F]+$/.test(string),
);
const asciiSet = new Set(arrayEncodeMultipleSymbolsAscii);
const arrayEncodeMultipleSymbolsNonAscii = arrayEncodeMultipleSymbols.filter(
	(string) => !asciiSet.has(string),
);

const encodeSingleSymbolsNonAscii = regenerate(loneCodePoints)
	.removeRange(0x00, 0x7f)
	.toString();
const encodeMultipleSymbolsNonAscii = jsesc(
	arrayEncodeMultipleSymbolsNonAscii.join('|'),
);

// Note: only the non-ASCII variant is used by the library.
export const regexEncodeNonAscii = joinStrings(
	encodeMultipleSymbolsNonAscii,
	encodeSingleSymbolsNonAscii,
);
