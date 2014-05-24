var fs = require('fs');
var jsesc = require('jsesc');
var regenerate = require('regenerate');
var difference = require('lodash.difference');
require('string.fromcodepoint');

var readJSON = function(fileName) {
	var contents = fs.readFileSync('data/' + fileName + '.json', 'utf-8');
	var object = JSON.parse(contents);
	if (Array.isArray(object)) {
		return object;
	}
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

var loneCodePoints = readJSON('encode-lone-code-points');
var arrayEncodeMultipleSymbols = readJSON('encode-paired-symbols');
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
var encodeASCII = joinStrings(
	encodeMultipleSymbolsASCII,
	encodeSingleSymbolsASCII
);
var encodeNonASCII = joinStrings(
	encodeMultipleSymbolsNonASCII,
	encodeSingleSymbolsNonASCII
);

var invalidRawCodePoints = readJSON('invalid-raw-code-points');
// U+0000 is a parse error in the Data state (which is the state where `he`’s
// input and output is supposed to end up in), so add it to the set of invalid
// raw code points. http://whatwg.org/html/tokenization.html#data-state
invalidRawCodePoints.unshift(0x0000);

module.exports = {
	'encodeMap': readJSON('encode-map'),
	'encodeASCII': encodeASCII, // not used
	'encodeNonASCII': encodeNonASCII,
	'decodeOverrides': readJSON('decode-map-overrides'),
	'decodeMap': readJSON('decode-map'),
	'decodeMapLegacy': readJSON('decode-map-legacy'),
	'astralSymbol': regenerate().addRange(0x010000, 0x10FFFF).toString(),
	'invalidReferenceCodePoints': (function() {
		return jsesc(readJSON('invalid-character-reference-code-points'));
	}()),
	'invalidRawCodePoints': regenerate(invalidRawCodePoints).toString(),
	'invalidCodePointsString': (function() {
		var string = String.fromCodePoint.apply(0, invalidRawCodePoints);
		return jsesc(string, { 'wrap': true });
	}()),
	'regexDecimalEscapeSource': '&#([0-9]+)(;?)',
	'regexHexadecimalEscapeSource': '&#[xX]([a-fA-F0-9]+)(;?)',
	'regexNamedReferenceSource': '&([0-9a-zA-Z]+);',
	'regexLegacyReferenceSource': (function() {
		return '&(' + readJSON('decode-legacy-named-references').join('|') +
			')([=a-zA-Z0-9])?';
	}()),
	'regexLoneSurrogate': '[\\uD800-\\uDBFF](?:[^\\uDC00-\\uDFFF]|$)|(?:[^\\uD800-\uDBFF]|^)[\\uDC00-\\uDFFF]',
	'testData': fs.readFileSync('data/entities.json', 'utf-8').trim(),
	'version': JSON.parse(fs.readFileSync('package.json', 'utf-8')).version
};
