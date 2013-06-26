var fs = require('fs');
var _ = require('lodash');
var stringEscape = require('string-escape');
var regenerate = require('regenerate');

// http://www.whatwg.org/specs/web-apps/current-work/multipage/entities.json
var data = JSON.parse(fs.readFileSync('tests/entities.json', 'utf8'));

var encodeMap = {};
var encodeMultipleSymbols = [];
var encodeSingleCodePointsSet = regenerate();
var decodeMap = {};

_.forOwn(data, function(value, key) {
	var referenceWithLeadingAmpersand = key;
	var referenceWithoutLeadingAmpersand = referenceWithLeadingAmpersand.replace(/^&/, '');
	var string = value.characters;
	var codePoints = value.codepoints;
	var escaped;
	var tmp;
	if (/;$/.test(referenceWithoutLeadingAmpersand) && (!/^[\x20-\x7E\n]+$/g.test(string) || /^[&<>"']+$/g.test(string))) {
		// only if the entity has a trailing semicolon, and the original string is not printable ASCII already
		escaped = stringEscape(string);
		tmp = encodeMap[escaped];
		if (tmp) {
			// Prefer short named character references with as few uppercase letters as possible
			if (tmp.length > referenceWithLeadingAmpersand.length) {
				encodeMap[escaped] = referenceWithLeadingAmpersand;
			} else if (tmp.length == referenceWithLeadingAmpersand.length &&
				(referenceWithLeadingAmpersand.match(/[A-Z]/g) || []).length < (tmp.match(/[A-Z]/g) || []).length) {
				encodeMap[escaped] = referenceWithLeadingAmpersand;
			} else {
				// do nothing
			}
		} else {
			encodeMap[escaped] = referenceWithLeadingAmpersand;
		}
		if (codePoints.length == 1) {
			encodeSingleCodePointsSet.add(codePoints[0]);
		} else {
			encodeMultipleSymbols.push(
				stringEscape(string, {
					'escapeEverything': true
				})
			);
		}
	}
	decodeMap[referenceWithoutLeadingAmpersand] = stringEscape(string);
});

encodeMultipleSymbols = _.sortBy(encodeMultipleSymbols, function(string) {
	return eval('\'' + string + '\'');
});
encodeMultipleSymbols = _.uniq(encodeMultipleSymbols);

var postProcess = function(object) {
	return JSON.stringify(object).replace(/\\\\/g, '\\');
};

module.exports = {
	'encodeMap': postProcess(encodeMap),
	'encodeSingleSymbol': encodeSingleCodePointsSet.toString(),
	'astralSymbols': regenerate.fromCodePointRange(0x010000, 0x10FFFF),
	'encodeMultipleSymbols': encodeMultipleSymbols.join('|'),
	'decodeMap': postProcess(decodeMap),
	'version': JSON.parse(fs.readFileSync('package.json', 'utf8')).version
};
