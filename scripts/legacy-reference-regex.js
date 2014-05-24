var legacyReferences = require('../data/decode-legacy-named-references.json');
var regexLegacyReference = '&(' + legacyReferences.join('|') +
	')([=a-zA-Z0-9])?';

module.exports = regexLegacyReference;
