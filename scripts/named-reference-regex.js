'use strict';

const namedReferences = Object.keys(
	require('../data/decode-map.json')
).sort((a, b) => b.length - a.length);

// const Trie = require('regexgen').Trie;
// const trie = new Trie();
// trie.addAll(namedReferences);
// const pattern = trie.toString();
// console.log(pattern);
// → 12 KB instead of the 16 KB of the current output.
// However, the current output gzips better, and has better
// run-time performance.

// Verify all references consist of characters that don’t need escaping
// within regular expressions. (If this is not the case, then we can’t
// simply do a `join('|')`.)
console.assert(namedReferences.every((reference) => {
	return /^[a-zA-Z0-9]+$/.test(reference);
}));
const regexNamedReference = '&(' + namedReferences.join('|') + ');';

module.exports = regexNamedReference;
