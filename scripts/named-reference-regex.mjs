import decodeMap from '../data/decode-map.json' with { type: 'json' };

const namedReferences = Object.keys(decodeMap).sort(
	(a, b) => b.length - a.length,
);

// Using a trie (e.g. `regexgen`) produces 12 KB instead of the 16 KB of the
// current output. However, the current output gzips better, and has better
// run-time performance.

// Verify all references consist of characters that don’t need escaping
// within regular expressions. (If this is not the case, then we can’t
// simply do a `join('|')`.)
if (!namedReferences.every((reference) => /^[a-zA-Z0-9]+$/.test(reference))) {
	throw new Error('Named references contain characters that need escaping.');
}

export const regexNamedReferenceSource = `&(${namedReferences.join('|')});`;
