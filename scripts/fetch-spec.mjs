import { writeFile } from 'node:fs/promises';
import jsesc from 'jsesc';
import { parseHTML } from 'linkedom';

// Usage: `node scripts/fetch-spec.mjs [html-url] [infra-url]`. The URLs default
// to the living standards; pass commit snapshot URLs to scrape specific
// revisions.
const htmlUrl = process.argv[2] ?? 'https://html.spec.whatwg.org/';
const infraUrl = process.argv[3] ?? 'https://infra.spec.whatwg.org/';

const fetchDocument = async (url) => {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Failed to fetch ${url}: HTTP ${response.status}.`);
	}
	return parseHTML(await response.text()).document;
};

const normalizeWhitespace = (text) => text.replace(/\s+/g, ' ').trim();

// Throws if `text` doesn’t match `pattern`, so that spec changes that would
// invalidate the assumptions in this script are caught instead of silently
// producing incorrect data.
const assertProse = (text, pattern, description) => {
	if (!pattern.test(text)) {
		throw new Error(
			`The spec no longer says what this scraper expects (${description}). ` +
				`Got: ${JSON.stringify(text.slice(0, 500))}. No data files were written.`,
		);
	}
};

const range = (start, stop) => {
	return Array.from({ length: stop - start + 1 }, (_, index) => start + index);
};

// Collects code points from text such as `U+FDD0 to U+FDEF`,
// `U+0000 NULL to U+001F INFORMATION SEPARATOR ONE`, and `U+0009 TAB`.
const parseCodePoints = (text) => {
	const codePoints = [];
	const remainder = text.replace(
		/U\+([0-9A-F]{4,6})(?: [A-Z][A-Z0-9 -]*?)? to U\+([0-9A-F]{4,6})/g,
		(_, start, end) => {
			codePoints.push(...range(parseInt(start, 16), parseInt(end, 16)));
			return '';
		},
	);
	for (const [, hex] of remainder.matchAll(/U\+([0-9A-F]{4,6})/g)) {
		codePoints.push(parseInt(hex, 16));
	}
	return codePoints;
};

// Returns the normalized text of the paragraph containing the `<dfn>` with
// the given ID.
const definitionText = (document, id) => {
	const dfn = document.getElementById(id);
	if (!dfn) {
		throw new Error(`Definition #${id} not found. No data files were written.`);
	}
	return normalizeWhitespace(dfn.closest('p, dd, li, div').textContent);
};

// Returns the normalized text of everything between the heading with the
// given ID and the next heading.
const sectionText = (document, id) => {
	const heading = document.getElementById(id);
	if (!heading) {
		throw new Error(`Section #${id} not found. No data files were written.`);
	}
	let text = '';
	let element = heading;
	while ((element = element.nextElementSibling)) {
		if (/^H[1-6]$/.test(element.tagName)) {
			break;
		}
		text += ` ${element.textContent}`;
	}
	return normalizeWhitespace(text);
};

const toSortedSet = (codePoints) => {
	return [...new Set(codePoints)].sort((a, b) => a - b);
};

const [htmlDocument, infraDocument] = await Promise.all([
	fetchDocument(htmlUrl),
	fetchDocument(infraUrl),
]);

/*--------------------------------------------------------------------------*/

// Code point classes, as defined by the Infra Standard.
// https://infra.spec.whatwg.org/#code-points

const noncharacterText = definitionText(infraDocument, 'noncharacter');
assertProse(
	noncharacterText,
	/^A noncharacter is a code point/,
	'noncharacter',
);
const noncharacters = parseCodePoints(noncharacterText);

const c0ControlText = definitionText(infraDocument, 'c0-control');
assertProse(c0ControlText, /^A C0 control is a code point/, 'C0 control');
const c0Controls = parseCodePoints(c0ControlText);

const controlText = definitionText(infraDocument, 'control');
assertProse(controlText, /^A control is a C0 control or/, 'control');
const controls = [...c0Controls, ...parseCodePoints(controlText)];

const asciiWhitespaceText = definitionText(infraDocument, 'ascii-whitespace');
assertProse(
	asciiWhitespaceText,
	/^ASCII whitespace is U\+/,
	'ASCII whitespace',
);
const asciiWhitespace = new Set(parseCodePoints(asciiWhitespaceText));

const nonWhitespaceControls = controls.filter(
	(codePoint) => !asciiWhitespace.has(codePoint),
);

/*--------------------------------------------------------------------------*/

// Character reference overrides.
// https://html.spec.whatwg.org/multipage/parsing.html#table-charref-overrides
const table = htmlDocument.querySelector('#table-charref-overrides');
const overrides = new Map();
const parseHex = (text) => {
	const match = /(?:0x|U\+)([0-9A-F]+)/i.exec(text);
	if (!match) {
		throw new Error(`Unexpected table cell: ${JSON.stringify(text)}.`);
	}
	return parseInt(match[1], 16);
};
for (const row of table.querySelectorAll('tr')) {
	const cells = row.querySelectorAll('td');
	if (cells.length < 2) {
		// Skip the header row.
		continue;
	}
	const number = parseHex(cells[0].textContent);
	const codePoint = parseHex(cells[1].textContent);
	if (number !== codePoint) {
		overrides.set(number, String.fromCodePoint(codePoint));
	}
}
if (overrides.size === 0) {
	throw new Error(
		'No character reference overrides found. No data files were written.',
	);
}

// Code points that cause parse errors when used in numeric character
// references.
// https://html.spec.whatwg.org/multipage/parsing.html#numeric-character-reference-end-state
const numericEndText = sectionText(
	htmlDocument,
	'numeric-character-reference-end-state',
);
assertProse(
	numericEndText,
	/If the number is 0x00, then this is a null-character-reference parse error\. Set the character reference code to 0xFFFD\./,
	'null character reference',
);
assertProse(
	numericEndText,
	/If the number is a noncharacter, then this is a noncharacter-character-reference parse error\./,
	'noncharacter character reference',
);
assertProse(
	numericEndText,
	/If the number is 0x0D, or a control that's not ASCII whitespace, then this is a control-character-reference parse error\./,
	'control character reference',
);
// A null character reference is replaced with U+FFFD, just like the entries
// in the overrides table.
overrides.set(0x00, '\uFFFD');
const charRefCodePoints = toSortedSet([
	...noncharacters,
	0x0d,
	// U+0000 is handled by the null character reference rule above.
	...nonWhitespaceControls.filter((codePoint) => codePoint !== 0x00),
]);

// Code points for symbols that cause parse errors when in the HTML source.
// https://html.spec.whatwg.org/multipage/parsing.html#preprocessing-the-input-stream
const preprocessingText = sectionText(
	htmlDocument,
	'preprocessing-the-input-stream',
);
assertProse(
	preprocessingText,
	/Any occurrences of noncharacters are noncharacter-in-input-stream parse errors and any occurrences of controls other than ASCII whitespace and U\+0000 NULL characters are control-character-in-input-stream parse errors\./,
	'input stream parse errors',
);
// U+0000 is a parse error in the Data state (which is the state where `he`’s
// input and output is supposed to end up in), so it is included as well.
// https://html.spec.whatwg.org/multipage/parsing.html#data-state
// Surrogates are handled separately; see `invalid-code-points-regex.mjs`.
const rawCodePoints = toSortedSet([
	0x00,
	...noncharacters,
	...nonWhitespaceControls,
]);
// Note: `invalid-character-reference-code-points.json` is identical to
// `invalid-raw-code-points.json` except U+000D (CR) is not included in the
// latter, because lone CR are converted to LF before tokenization, and U+0000
// is not included in the former, because it is handled by the null character
// reference rule.

/*--------------------------------------------------------------------------*/

const writeJSON = async (fileName, data) => {
	const contents = jsesc(data, {
		json: true,
		compact: false,
	});
	await writeFile(new URL(`../${fileName}`, import.meta.url), `${contents}\n`);
	console.log(`${fileName} created successfully.`);
};

const sortedOverrides = [...overrides].sort(([a], [b]) => a - b);
await writeJSON(
	'data/decode-map-overrides.json',
	Object.fromEntries(sortedOverrides),
);
await writeJSON(
	'data/decode-code-points-overrides.json',
	sortedOverrides.map(([codePoint]) => codePoint),
);
await writeJSON(
	'data/invalid-character-reference-code-points.json',
	charRefCodePoints,
);
await writeJSON('data/invalid-raw-code-points.json', rawCodePoints);
