import regenerate from 'regenerate';
import invalidRawCodePoints from '../data/invalid-raw-code-points.json' with { type: 'json' };

export const regexInvalidRawCodePoints = regenerate(invalidRawCodePoints)
	// https://html.spec.whatwg.org/multipage/#preprocessing-the-input-stream
	// “Any character that is a not a Unicode character, i.e. any isolated
	// surrogate, is a parse error.”
	.addRange(0xd800, 0xdbff)
	.addRange(0xdc00, 0xdfff)
	.toString();
