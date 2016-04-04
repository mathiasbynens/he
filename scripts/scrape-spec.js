#!/usr/bin/env phantomjs

var page = require('webpage').create();
var fs = require('fs');
var jsesc = require('jsesc');

var open = function(url, callback) {
	page.open(url, function(status) {
		if (status != 'success') {
			return phantom.exit();
		}
		callback();
	});
};

var writeJSON = function(fileName, data) {
	var contents = jsesc(data, {
		'json': true,
		'compact': false
	});
	fs.write(fileName, contents + '\n', 'w');
	console.log(fileName + ' created successfully.');
};

open('https://html.spec.whatwg.org/', function() {
	var result = JSON.parse(page.evaluate(function() {

		// Modified version of `ucs2encode`; see https://mths.be/punycode
		var stringFromCharCode = String.fromCharCode;
		var codePointToSymbol = function(codePoint) {
			var output = '';
			if (codePoint > 0xFFFF) {
				codePoint -= 0x10000;
				output += stringFromCharCode(codePoint >>> 10 & 0x3FF | 0xD800);
				codePoint = 0xDC00 | codePoint & 0x3FF;
			}
			output += stringFromCharCode(codePoint);
			return output;
		};

		var range = function(start, stop) {
			for (var result = []; start <= stop; result.push(start++));
			return result;
		};

		// Code points that cause parse errors when used in character references
		// https://html.spec.whatwg.org/multipage/syntax.html#table-charref-overrides
		var table = document.querySelector('#table-charref-overrides');
		var siblings = table.parentNode.children;
		var max = siblings.length - 1;
		var text = siblings[max].textContent;
		var charRefCodePoints = [];
		text.replace(/0x([a-fA-F0-9]+)\s+to\s+0x([a-fA-F0-9]+)/g, function($0, $1, $2) {
			var start = parseInt($1, 16);
			var end = parseInt($2, 16);
			charRefCodePoints = charRefCodePoints.concat(range(start, end));
			return '';
		}).replace(/0x([a-fA-F0-9]+)/g, function($0, $1) {
			var codePoint = parseInt($1, 16);
			charRefCodePoints.push(codePoint);
			return '';
		});
		charRefCodePoints = charRefCodePoints.sort(function(a, b) {
			return a - b;
		});

		// Character reference overrides
		// https://html.spec.whatwg.org/multipage/syntax.html#table-charref-overrides
		var cells = table.querySelectorAll('td');
		var keys = [].filter.call(cells, function(cell, index) {
			return index % 3 == 0;
		}).map(function(cell) {
			return Number(cell.textContent.trim());
		});
		var values = [].filter.call(cells, function(cell, index) {
			return index % 3 == 1;
		}).map(function(cell) {
			var hex = cell.textContent.trim().replace('U+', '');
			var codePoint = parseInt(hex, 16);
			return codePointToSymbol(codePoint);
		});
		var overrides = {};
		keys = keys.forEach(function(codePoint, index) {
			var symbol = codePointToSymbol(codePoint);
			var correspondingValue = values[index];
			var mapsToItself = symbol == correspondingValue;
			var alreadyMarkedAsInvalid = charRefCodePoints.indexOf(codePoint) > -1;
			if (mapsToItself && !alreadyMarkedAsInvalid) {
				charRefCodePoints.push(codePoint);
				return;
			}
			if (!mapsToItself || !alreadyMarkedAsInvalid) {
				overrides[codePoint] = correspondingValue;
			}
		});

		// Code points for symbols that cause parse errors when in the HTML source
		// https://html.spec.whatwg.org/multipage/syntax.html#preprocessing-the-input-stream
		var header = document.querySelector('#preprocessing-the-input-stream');
		var element = header;
		var text;
		while (element = element.nextSibling) {
			text = element.textContent.trim();
			if (/Any occurrences of any characters in the ranges/.test(text)) {
				break;
			}
		}
		var rawCodePoints = [];
		text.replace(/U\+([a-fA-F0-9]+)\s+to\s+U\+([a-fA-F0-9]+)/g, function($0, $1, $2) {
			var start = parseInt($1, 16);
			var end = parseInt($2, 16);
			rawCodePoints = rawCodePoints.concat(range(start, end));
			return '';
		}).replace(/U\+([a-fA-F0-9]+)/g, function($0, $1) {
			var codePoint = parseInt($1, 16);
			rawCodePoints.push(codePoint);
			return '';
		});
		rawCodePoints = rawCodePoints.sort(function(a, b) {
			return a - b;
		});
		// U+0000 is a parse error in the Data state (which is the state where
		// `he`’s input and output is supposed to end up in), so add it to the set
		// of invalid raw code points.
		// https://html.spec.whatwg.org/multipage/syntax.html#data-state
		rawCodePoints.unshift(0x0000);

		// Pass everything back to PhantomJS.
		return JSON.stringify({
			'overrides': overrides,
			'charRefCodePoints': charRefCodePoints,
			'rawCodePoints': rawCodePoints
		});

	}));

	var overrides = result.overrides;
	var overrideCodePoints = Object.keys(overrides).map(Number);
	writeJSON('data/decode-map-overrides.json', overrides);
	writeJSON('data/decode-code-points-overrides.json', overrideCodePoints);
	writeJSON('data/invalid-character-reference-code-points.json', result.charRefCodePoints);
	writeJSON('data/invalid-raw-code-points.json', result.rawCodePoints);
	// Note: `invalid-character-reference-code-points.json` is identical to
	// `invalid-raw-code-points.json` except U+000D (CR) is not included in
	// the latter, because lone CR are converted to LF before tokenization.
	// https://html.spec.whatwg.org/multipage/syntax.html#preprocessing-the-input-stream

	phantom.exit();
});
