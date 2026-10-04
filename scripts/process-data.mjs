import { writeFile } from 'node:fs/promises';
import jsesc from 'jsesc';
// https://html.spec.whatwg.org/entities.json
import data from '../data/entities.json' with { type: 'json' };

const encodeMap = new Map();
const encodeMultipleSymbols = [];
const encodeSingleCodePoints = [];
const decodeMap = new Map();
const decodeMapLegacy = new Map();

const countUppercase = (string) => (string.match(/[A-Z]/g) || []).length;

for (const [key, value] of Object.entries(data)) {
	const referenceWithoutLeadingAmpersand = key.replace(/^&/, '');
	const referenceOnly = referenceWithoutLeadingAmpersand.replace(/;$/, '');
	const string = value.characters;
	const codePoints = value.codepoints;
	if (/;$/.test(referenceWithoutLeadingAmpersand)) {
		// Only enter this branch if the entity has a trailing semicolon.
		const tmp = encodeMap.get(string);
		// Prefer short named character references with as few uppercase letters as
		// possible.
		if (
			// Only add an entry if…
			!tmp || // …there is no entry for this string yet, or…
			tmp.length > referenceOnly.length || // …this reference is shorter, or…
			// …this reference contains fewer uppercase letters.
			(tmp.length == referenceOnly.length &&
				countUppercase(referenceOnly) < countUppercase(tmp))
		) {
			encodeMap.set(string, referenceOnly);
		}
		if (codePoints.length == 1) {
			encodeSingleCodePoints.push(codePoints[0]);
		} else {
			encodeMultipleSymbols.push(string);
		}
		decodeMap.set(referenceOnly, string);
	} else {
		decodeMapLegacy.set(referenceWithoutLeadingAmpersand, string);
	}
}

// Preserve the behavior of he v1.2.0. The previous data pipeline used
// `sort-object`, which mishandles keys containing a backslash, so the entry for
// U+005C REVERSE SOLIDUS was lost and `\` is encoded as `&#x5C;` rather than
// `&bsol;`. Remove this line to opt into `&bsol;`.
encodeMap.delete('\\');

const compareCodeUnits = (a, b) => {
	if (a < b) {
		return -1;
	}
	if (a > b) {
		return 1;
	}
	return 0;
};

// Converts a `Map` into a plain object with keys sorted by code unit, for JSON
// serialization.
const toSortedObject = (map) => {
	return Object.fromEntries(
		[...map].sort(([a], [b]) => compareCodeUnits(a, b)),
	);
};

const unique = (array) => [...new Set(array)];

// Sort strings by code unit value.
const uniqueEncodeMultipleSymbols = unique(
	encodeMultipleSymbols.toSorted(compareCodeUnits),
);
// Sort numerically.
const uniqueEncodeSingleCodePoints = unique(
	encodeSingleCodePoints.toSorted((a, b) => a - b),
);

// Optimize the regular expression that will be generated based on this data
// by sorting the references by length in descending order. If the length of
// both strings is equal, sort alphabetically.
const legacyReferences = [...decodeMapLegacy.keys()].sort((a, b) => {
	return b.length - a.length || compareCodeUnits(a, b);
});

const writeJSON = async (fileName, object) => {
	const json = jsesc(object, {
		compact: false,
		json: true,
	});
	await writeFile(new URL(`../${fileName}`, import.meta.url), `${json}\n`);
};

await Promise.all([
	writeJSON('data/decode-map.json', toSortedObject(decodeMap)),
	writeJSON('data/decode-map-legacy.json', toSortedObject(decodeMapLegacy)),
	writeJSON('data/decode-legacy-named-references.json', legacyReferences),
	writeJSON('data/encode-map.json', toSortedObject(encodeMap)),
	writeJSON('data/encode-paired-symbols.json', uniqueEncodeMultipleSymbols),
	writeJSON('data/encode-lone-code-points.json', uniqueEncodeSingleCodePoints),
]);
