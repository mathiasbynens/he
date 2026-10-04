import regenerate from 'regenerate';
import decodeCodePointsOverrides from '../data/decode-code-points-overrides.json' with { type: 'json' };

export const regexBmpWhitelist = regenerate()
	// Add all BMP symbols.
	.addRange(0x0, 0xffff)
	// Remove ASCII newlines.
	.remove('\r', '\n')
	// Remove printable ASCII symbols.
	.removeRange(0x20, 0x7e)
	// Remove code points listed in the first column of the overrides table.
	// https://html.spec.whatwg.org/multipage/syntax.html#table-charref-overrides
	.remove(decodeCodePointsOverrides)
	.toString({ bmpOnly: true });
