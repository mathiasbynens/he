var fs = require('fs');
var jsesc = require('jsesc');
var _ = require('lodash');

// https://html.spec.whatwg.org/entities.json
var data = require('../data/entities.json');

var encodeMap = {};
var encodeMultipleSymbols = [];
var encodeSingleCodePoints = [];
var decodeMap = {};
var decodeMapLegacy = {};

_.forOwn(data, function(value, key) {
	var referenceWithLeadingAmpersand = key;
	var referenceWithoutLeadingAmpersand = referenceWithLeadingAmpersand.replace(/^&/, '');
	var referenceOnly = referenceWithoutLeadingAmpersand.replace(/;$/, '');
	var string = value.characters;
	var codePoints = value.codepoints;
	var tmp;
	if (/;$/.test(referenceWithoutLeadingAmpersand)) {
		// only if the entity has a trailing semicolon
		tmp = encodeMap[string];
		// Prefer short named character references with as few uppercase letters as possible
		if ( // only add an entry if…
			!tmp || ( // …there is no entry for this string yet, or…
				tmp.length > referenceOnly.length || // …this reference is shorter, or…
				(
					// …this reference contains fewer uppercase letters
					tmp.length == referenceOnly.length &&
					(referenceOnly.match(/[A-Z]/g) || []).length <
					(tmp.match(/[A-Z]/g) || []).length
				)
			)
		) {
			encodeMap[string] = referenceOnly;
		} else {
			// do nothing
		}
		if (codePoints.length == 1) {
			encodeSingleCodePoints.push(codePoints[0]);
		} else {
			encodeMultipleSymbols.push(string);
		}
	}
	if (/;$/.test(referenceWithoutLeadingAmpersand)) {
		decodeMap[referenceWithoutLeadingAmpersand.replace(/;$/, '')] = string;
	} else {
		decodeMapLegacy[referenceWithoutLeadingAmpersand] = string;
	}
});

encodeMultipleSymbols = _.uniq(
	encodeMultipleSymbols.sort(), // sort strings by code point value
	true
);

encodeSingleCodePoints = _.uniq(
	_.sortBy(encodeSingleCodePoints), // numeric sort
	true
);

var legacyReferences = _.keys(decodeMapLegacy).sort(function(a, b) {
	if (a.length > b.length) {
		return -1;
	}
	if (a.length < b.length) {
		return 1;
	}
	// a.length == b.length, so sort alphabetically
	return a - b;
});

var writeJSON = function(fileName, object) {
	var json = jsesc(object, {
		'compact': false,
		'json': true
	});
	fs.writeFileSync(fileName, json + '\n');
};

writeJSON('data/decode-map.json', decodeMap);
writeJSON('data/decode-map-legacy.json', decodeMapLegacy);
writeJSON('data/decode-legacy-named-references.json', legacyReferences);
writeJSON('data/encode-map.json', encodeMap);
writeJSON('data/encode-paired-symbols.json', encodeMultipleSymbols);
writeJSON('data/encode-lone-code-points.json', encodeSingleCodePoints);
