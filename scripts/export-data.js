var jsesc = require('jsesc');

var formatJSON = function(fileName) {
	var object = require('../data/' + fileName + '.json');
	return jsesc(object, {
		'compact': true,
		'quotes': 'single'
	});
};

module.exports = {
	'decodeMap': formatJSON('decode-map'),
	'decodeMapLegacy': formatJSON('decode-map-legacy'),
	'decodeMapOverrides': formatJSON('decode-map-overrides'),
	'encodeMap': formatJSON('encode-map'),
	'invalidReferenceCodePoints': formatJSON('invalid-character-reference-code-points'),
	'regexAsciiWhitelist': require('./ascii-whitelist-regex.js'),
	'regexAstralSymbol': require('./astral-symbol-regex.js'),
	'regexBmpWhitelist': require('./bmp-whitelist-regex.js'),
	'regexDecimalEscapeSource': '&#([0-9]+)(;?)',
	'regexEncodeNonAscii': require('./encode-non-ascii-regex.js'),
	'regexHexadecimalEscapeSource': '&#[xX]([a-fA-F0-9]+)(;?)',
	'regexInvalidRawCodePoints': require('./invalid-code-points-regex.js'),
	'regexLegacyReferenceSource': require('./legacy-reference-regex.js'),
	'regexLoneSurrogate': '[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF]',
	'regexNamedReferenceSource': '&([0-9a-zA-Z]+);',
	'stringInvalidCodePoints': require('./invalid-code-points-string.js'),
	'testDataMap': formatJSON('entities'),
	'version': require('../package.json').version
};
