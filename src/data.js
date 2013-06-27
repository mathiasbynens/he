// Disclaimer: The code in this file is messy… But it works.
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
var decodeMapWithoutSemicolons = {};

_.forOwn(data, function(value, key) {
	var referenceWithLeadingAmpersand = key;
	var referenceWithoutLeadingAmpersand = referenceWithLeadingAmpersand.replace(/^&/, '');
	var referenceOnly = referenceWithoutLeadingAmpersand.replace(/;$/, '');
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
			if (tmp.length > referenceOnly.length) {
				encodeMap[escaped] = referenceOnly;
			} else if (tmp.length == referenceOnly.length &&
				(referenceOnly.match(/[A-Z]/g) || []).length < (tmp.match(/[A-Z]/g) || []).length) {
				encodeMap[escaped] = referenceOnly;
			} else {
				// do nothing
			}
		} else {
			encodeMap[escaped] = referenceOnly;
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
	if (/;$/.test(referenceWithoutLeadingAmpersand)) {
		decodeMap[referenceWithoutLeadingAmpersand.replace(/;$/, '')] = stringEscape(string);
	} else {
		decodeMapWithoutSemicolons[referenceWithoutLeadingAmpersand] = stringEscape(string);
	}
});

encodeMultipleSymbols = _.sortBy(encodeMultipleSymbols, function(string) {
	return eval('\'' + string + '\'');
});
encodeMultipleSymbols = _.uniq(encodeMultipleSymbols);

var legacyReferences = _.keys(decodeMapWithoutSemicolons).sort(function(a, b) {
	if (a.length > b.length) {
		return -1;
	}
	if (a.length < b.length) {
		return 1;
	}
	// a.length == b.length, so sort alphabetically
	return a - b;
});

var postProcess = function(object) {
	return JSON.stringify(object).replace(/\\\\/g, '\\');
};

encodeMap = postProcess(encodeMap);
decodeMap = postProcess(decodeMap);
decodeMapWithoutSemicolons = postProcess(decodeMapWithoutSemicolons);

module.exports = {
	'encodeMap': encodeMap,
	'encodeSingleSymbol': encodeSingleCodePointsSet.toString(),
	'astralSymbols': regenerate.fromCodePointRange(0x010000, 0x10FFFF),
	'encodeMultipleSymbols': encodeMultipleSymbols.join('|'),
	'decodeMap': decodeMap,
	'decodeMapWithoutSemicolons': decodeMapWithoutSemicolons,
	'legacyReferences': legacyReferences.join('|'),
	'version': JSON.parse(fs.readFileSync('package.json', 'utf8')).version
};
