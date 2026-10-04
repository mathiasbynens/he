import regenerate from 'regenerate';
import decodeCodePointsOverrides from '../data/decode-code-points-overrides.json' with { type: 'json' };

export const regexAsciiWhitelist = regenerate()
	// Add all ASCII symbols (not just printable ASCII).
	.addRange(0x0, 0x7f)
	// Remove code points listed in the first column of the overrides table.
	// https://html.spec.whatwg.org/multipage/syntax.html#table-charref-overrides
	.remove(decodeCodePointsOverrides)
	.toString();
