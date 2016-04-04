'use strict';

const fs = require('fs');
const jsesc = require('jsesc');
const _ = require('lodash');
const sortObject = require('sort-object');

// https://html.spec.whatwg.org/entities.json
const data = require('../data/entities.json');

const encodeMap = {};
let encodeMultipleSymbols = [];
let encodeSingleCodePoints = [];
const decodeMap = {};
const decodeMapLegacy = {};

_.forOwn(data, function(value, key) {
	const referenceWithLeadingAmpersand = key;
	const referenceWithoutLeadingAmpersand = referenceWithLeadingAmpersand.replace(/^&/, '');
	const referenceOnly = referenceWithoutLeadingAmpersand.replace(/;$/, '');
	const string = value.characters;
	const codePoints = value.codepoints;
	if (/;$/.test(referenceWithoutLeadingAmpersand)) {
		// Only enter this branch if the entity has a trailing semicolon.
		const tmp = encodeMap[string];
		// Prefer short named character references with as few uppercase letters as
		// possible.
		if ( // Only add an entry if…
			!tmp || ( // …there is no entry for this string yet, or…
				tmp.length > referenceOnly.length || // …this reference is shorter, or…
				(
					// …this reference contains fewer uppercase letters.
					tmp.length == referenceOnly.length &&
					(referenceOnly.match(/[A-Z]/g) || []).length <
					(tmp.match(/[A-Z]/g) || []).length
				)
			)
		) {
			encodeMap[string] = referenceOnly;
		} else {
			// Do nothing.
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
	encodeMultipleSymbols.sort(), // Sort strings by code point value.
	true
);

encodeSingleCodePoints = _.uniq(
	_.sortBy(encodeSingleCodePoints), // Sort numerically.
	true
);

const legacyReferences = _.keys(decodeMapLegacy).sort(function(a, b) {
	// Optimize the regular expression that will be generated based on this data
	// by sorting the references by length in descending order.
	if (a.length > b.length) {
		return -1;
	}
	if (a.length < b.length) {
		return 1;
	}
	// If the length of both strings is equal, sort alphabetically.
	if (a < b) {
		return -1;
	}
	if (a > b) {
		return 1;
	}
	return 0;
});

const writeJSON = function(fileName, object) {
	const json = jsesc(object, {
		'compact': false,
		'json': true
	});
	fs.writeFileSync(fileName, json + '\n');
};

writeJSON('data/decode-map.json', sortObject(decodeMap));
writeJSON('data/decode-map-legacy.json', sortObject(decodeMapLegacy));
writeJSON('data/decode-legacy-named-references.json', legacyReferences);
writeJSON('data/encode-map.json', sortObject(encodeMap));
writeJSON('data/encode-paired-symbols.json', encodeMultipleSymbols);
writeJSON('data/encode-lone-code-points.json', encodeSingleCodePoints);
