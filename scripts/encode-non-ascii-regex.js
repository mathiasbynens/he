'use strict';

const jsesc = require('jsesc');
const regenerate = require('regenerate');
const difference = require('lodash').difference;

const joinStrings = function(a, b) {
	if (a && b) {
		return a + '|' + b;
	}
	return a + b;
};

const loneCodePoints = require('../data/encode-lone-code-points.json');
const arrayEncodeMultipleSymbols = require('../data/encode-paired-symbols.json');
const arrayEncodeMultipleSymbolsAscii = arrayEncodeMultipleSymbols
	.filter(function(string) {
		return /^[\0-\x7F]+$/.test(string);
	});

const encodeSingleSymbolsAscii = regenerate(loneCodePoints)
	.removeRange(0x7F + 1, 0x10FFFF).toString();
const encodeSingleSymbolsNonAscii = regenerate(loneCodePoints)
	.removeRange(0x00, 0x7F).toString();
const encodeMultipleSymbolsAscii = jsesc(
	arrayEncodeMultipleSymbolsAscii.join('|')
);
const encodeMultipleSymbolsNonAscii = jsesc(
	difference(
		arrayEncodeMultipleSymbols,
		arrayEncodeMultipleSymbolsAscii
	).join('|')
);

const regexEncodeAscii = joinStrings(
	encodeMultipleSymbolsAscii,
	encodeSingleSymbolsAscii
);

const regexEncodeNonAscii = joinStrings(
	encodeMultipleSymbolsNonAscii,
	encodeSingleSymbolsNonAscii
);

// Note: `regexEncodeAscii` is not used.
module.exports = regexEncodeNonAscii;
