var fs = require('fs');
var jsesc = require('jsesc');
var regenerate = require('regenerate');

var object = {};
var toString = object.toString;
var isArray = function(value) {
	return toString.call(value) == '[object Array]';
};

var readJSON = function(fileName) {
	var contents = fs.readFileSync('data/' + fileName + '.json', 'utf-8');
	var object = JSON.parse(contents);
	if (isArray(object)) {
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
	regenerate.difference(
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

module.exports = {
	'encodeMap': readJSON('encode-map'),
	'encodeASCII': encodeASCII, // not used
	'encodeNonASCII': encodeNonASCII,
	'decodeOverrides': readJSON('decode-map-overrides'),
	'decodeMap': readJSON('decode-map'),
	'decodeMapLegacy': readJSON('decode-map-legacy'),
	'astralSymbol': regenerate.fromCodePointRange(0x010000, 0x10FFFF),
	'invalidCodePoints': jsesc(readJSON('invalid-code-points')),
	'regexDecimalEscapeSource': '&#([0-9]+)(;?)',
	'regexHexadecimalEscapeSource': '&#[xX]([a-fA-F0-9]+)(;?)',
	'regexNamedReferenceSource': '&([0-9a-zA-Z]+);',
	'regexLegacyReferenceSource': '&(' +
		readJSON('decode-legacy-named-references').join('|') + ')([=a-zA-Z0-9])?',
	'version': JSON.parse(fs.readFileSync('package.json', 'utf-8')).version
};
