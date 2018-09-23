'use strict';

const legacyReferences = require('../data/decode-legacy-named-references.json');
const regexLegacyReference = '&(' + legacyReferences.join('|') +
	')(?!;)([=a-zA-Z0-9]?)';

module.exports = regexLegacyReference;
