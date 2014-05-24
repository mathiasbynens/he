var fs = require('fs');
var jsesc = require('jsesc');
var regenerate = require('regenerate');
var difference = require('lodash.difference');
require('string.fromcodepoint');

var formatJSON = function(fileName) {
	var object = require('../data/' + fileName + '.json');
	return jsesc(object, {
		'compact': true,
		'quotes': 'single'
	});
};

var joinStrings = function(a, b) {
	if (a && b) {
		return a + '|' + b;
	}
	return a + b;
};

var loneCodePoints = require('../data/encode-lone-code-points.json');
var arrayEncodeMultipleSymbols = require('../data/encode-paired-symbols.json');
var arrayEncodeMultipleSymbolsASCII = arrayEncodeMultipleSymbols
	.filter(function(string) {
		return /^[\0-\x7F]+$/.test(string);
	});

var encodeSingleSymbolsASCII = regenerate(loneCodePoints)
	.removeRange(0x7F + 1, 0x10FFFF).toString();
var encodeSingleSymbolsNonASCII = regenerate(loneCodePoints)
	.removeRange(0x00, 0x7F).toString();
var encodeMultipleSymbolsASCII = jsesc(
	arrayEncodeMultipleSymbolsASCII.join('|')
);
var encodeMultipleSymbolsNonASCII = jsesc(
	difference(
		arrayEncodeMultipleSymbols,
		arrayEncodeMultipleSymbolsASCII
	).join('|')
);
var regexEncodeASCII = joinStrings(
	encodeMultipleSymbolsASCII,
	encodeSingleSymbolsASCII
);
var regexEncodeNonASCII = joinStrings(
	encodeMultipleSymbolsNonASCII,
	encodeSingleSymbolsNonASCII
);

var invalidRawCodePoints = require('../data/invalid-raw-code-points.json');
// U+0000 is a parse error in the Data state (which is the state where `he`’s
// input and output is supposed to end up in), so add it to the set of invalid
// raw code points. http://whatwg.org/html/tokenization.html#data-state
invalidRawCodePoints.unshift(0x0000);

var overrides = Object.keys(
	require('../data/decode-map-overrides.json')
).map(Number);

module.exports = {
	'encodeMap': formatJSON('encode-map'),
	'decodeMapOverrides': formatJSON('decode-map-overrides'),
	'decodeMap': formatJSON('decode-map'),
	'decodeMapLegacy': formatJSON('decode-map-legacy'),
	'invalidReferenceCodePoints': formatJSON('invalid-character-reference-code-points'),
	'invalidCodePointsString': (function() {
		var string = String.fromCodePoint.apply(0, invalidRawCodePoints);
		return jsesc(string, { 'wrap': true });
	}()),
	'regexEncodeASCII': regexEncodeASCII, // not used
	'regexEncodeNonASCII': regexEncodeNonASCII,
	'regexInvalidRawCodePoints': regenerate(invalidRawCodePoints).toString(),
	'regexAstralSymbol': regenerate().addRange(0x010000, 0x10FFFF).toString(),
	'regexDecimalEscapeSource': '&#([0-9]+)(;?)',
	'regexHexadecimalEscapeSource': '&#[xX]([a-fA-F0-9]+)(;?)',
	'regexNamedReferenceSource': '&([0-9a-zA-Z]+);',
	'regexLegacyReferenceSource': (function() {
		return '&(' +
			require('../data/decode-legacy-named-references.json').join('|') +
			')([=a-zA-Z0-9])?';
	}()),
	'regexLoneSurrogate': '[\\uD800-\\uDBFF](?:[^\\uDC00-\\uDFFF]|$)|(?:[^\\uD800-\uDBFF]|^)[\\uDC00-\\uDFFF]',
	'regexASCII': (function() {
		return regenerate()
			// Add all ASCII symbols (not just printable ASCII).
			.addRange(0x0, 0x7F)
 			// Remove code points listed in the first column of the overrides table.
			// http://whatwg.org/html/tokenization.html#table-charref-overrides
			.remove(overrides)
			.toString();
	}()),
	'regexOtherBMP': (function() {
		return regenerate()
			// Add all BMP symbols.
			.addRange(0x0, 0xFFFF)
			// Remove ASCII newlines.
			.remove('\r', '\n')
			// Remove printable ASCII symbols.
			.removeRange(0x20, 0x7E)
			// Remove code points listed in the first column of the overrides table.
			// http://whatwg.org/html/tokenization.html#table-charref-overrides
			.remove(overrides)
			.toString();
	}()),
	'testData': formatJSON('entities'),
	'version': require('../package.json').version
};
