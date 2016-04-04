'use strict';

const regenerate = require('regenerate');

const invalidRawCodePoints = require('../data/invalid-raw-code-points.json');
const regexInvalidRawCodePoints = regenerate(invalidRawCodePoints)
	// https://html.spec.whatwg.org/multipage/#preprocessing-the-input-stream
	// “Any character that is a not a Unicode character, i.e. any isolated
	// surrogate, is a parse error.”
	.addRange(0xD800, 0xDBFF)
	.addRange(0xDC00, 0xDFFF)
	.toString();

module.exports = regexInvalidRawCodePoints;
