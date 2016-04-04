'use strict';

const regenerate = require('regenerate');

const regexAsciiWhitelist = regenerate()
	// Add all ASCII symbols (not just printable ASCII).
	.addRange(0x0, 0x7F)
	// Remove code points listed in the first column of the overrides table.
	// https://html.spec.whatwg.org/multipage/syntax.html#table-charref-overrides
	.remove(require('../data/decode-code-points-overrides.json'))
	.toString();

module.exports = regexAsciiWhitelist;
