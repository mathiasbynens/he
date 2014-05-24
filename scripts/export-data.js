var fs = require('fs');
var jsesc = require('jsesc');
var regenerate = require('regenerate');
var difference = require('lodash.difference');

var formatJSON = function(fileName) {
	var object = require('../data/' + fileName + '.json');
	return jsesc(object, {
		'compact': true,
		'quotes': 'single'
	});
};

module.exports = {
	'regexEncodeNonAscii': require('./encode-non-ascii-regex.js'),
	'regexInvalidRawCodePoints': require('./invalid-code-points-regex.js'),
	'regexAstralSymbol': require('./astral-symbol-regex.js'),
	'regexDecimalEscapeSource': '&#([0-9]+)(;?)',
	'regexHexadecimalEscapeSource': '&#[xX]([a-fA-F0-9]+)(;?)',
	'regexNamedReferenceSource': '&([0-9a-zA-Z]+);',
	'regexLegacyReferenceSource': require('./legacy-reference-regex.js'),
	'regexLoneSurrogate': '[\\uD800-\\uDBFF](?:[^\\uDC00-\\uDFFF]|$)|(?:[^\\uD800-\uDBFF]|^)[\\uDC00-\\uDFFF]',
	'regexAsciiWhitelist': require('./ascii-whitelist-regex.js'),
	'regexBmpWhitelist': require('./bmp-whitelist-regex.js'),
	'encodeMap': formatJSON('encode-map'),
	'decodeMapOverrides': formatJSON('decode-map-overrides'),
	'decodeMap': formatJSON('decode-map'),
	'decodeMapLegacy': formatJSON('decode-map-legacy'),
	'testDataMap': formatJSON('entities'),
	'invalidReferenceCodePoints': formatJSON('invalid-character-reference-code-points'),
	'stringInvalidCodePoints': require('./invalid-code-points-string.js'),
	'version': require('../package.json').version
};
