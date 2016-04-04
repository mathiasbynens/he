const regenerate = require('regenerate');

const regexBmpWhitelist = regenerate()
	// Add all BMP symbols.
	.addRange(0x0, 0xFFFF)
	// Remove ASCII newlines.
	.remove('\r', '\n')
	// Remove printable ASCII symbols.
	.removeRange(0x20, 0x7E)
	// Remove code points listed in the first column of the overrides table.
	// https://html.spec.whatwg.org/multipage/syntax.html#table-charref-overrides
	.remove(require('../data/decode-code-points-overrides.json'))
	.toString({ 'bmpOnly': true });

module.exports = regexBmpWhitelist;
