var jsesc = require('jsesc');
var regenerate = require('regenerate');
var difference = require('lodash').difference;

var joinStrings = function(a, b) {
	if (a && b) {
		return a + '|' + b;
	}
	return a + b;
};

var loneCodePoints = require('../data/encode-lone-code-points.json');
var arrayEncodeMultipleSymbols = require('../data/encode-paired-symbols.json');
var arrayEncodeMultipleSymbolsAscii = arrayEncodeMultipleSymbols
	.filter(function(string) {
		return /^[\0-\x7F]+$/.test(string);
	});

var encodeSingleSymbolsAscii = regenerate(loneCodePoints)
	.removeRange(0x7F + 1, 0x10FFFF).toString();
var encodeSingleSymbolsNonAscii = regenerate(loneCodePoints)
	.removeRange(0x00, 0x7F).toString();
var encodeMultipleSymbolsAscii = jsesc(
	arrayEncodeMultipleSymbolsAscii.join('|')
);
var encodeMultipleSymbolsNonAscii = jsesc(
	difference(
		arrayEncodeMultipleSymbols,
		arrayEncodeMultipleSymbolsAscii
	).join('|')
);

var regexEncodeAscii = joinStrings(
	encodeMultipleSymbolsAscii,
	encodeSingleSymbolsAscii
);

var regexEncodeNonAscii = joinStrings(
	encodeMultipleSymbolsNonAscii,
	encodeSingleSymbolsNonAscii
);

// Note: `regexEncodeAscii` is not used.
module.exports = regexEncodeNonAscii;
