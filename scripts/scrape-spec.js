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

var writeJSON = function(fileName, contents) {
	fs.write(fileName, contents + '\n', 'w');
	console.log(fileName + ' created successfully.');
};

open('http://www.whatwg.org/specs/web-apps/current-work/multipage/tokenization.html#table-charref-overrides', function() {
	var result = page.evaluate(function() {

		// Modified version of `ucs2encode`; see http://mths.be/punycode
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

		var table = document.querySelector('#table-charref-overrides');

		// Code points that cause parse errors
		var siblings = table.parentNode.children;
		var max = siblings.length - 1;
		var text = siblings[max].innerText;
		var codePoints = [];
		text.replace(/0x([a-fA-F0-9]+)\s+to\s+0x([a-fA-F0-9]+)/g, function($0, $1, $2) {
			var start = parseInt($1, 16);
			var end = parseInt($2, 16);
			codePoints = codePoints.concat(range(start, end));
			return '';
		}).replace(/0x([a-fA-F0-9]+)/g, function($0, $1) {
			var codePoint = parseInt($1, 16);
			codePoints.push(codePoint);
			return '';
		});

		// Character reference overrides
		var cells = table.querySelectorAll('td');
		var keys = [].filter.call(cells, function(cell, index) {
			return index % 3 == 0;
		}).map(function(cell) {
			return Number(cell.innerText.trim());
		});
		var values = [].filter.call(cells, function(cell, index) {
			return index % 3 == 1;
		}).map(function(cell) {
			var hex = cell.innerText.trim().replace('U+', '');
			var codePoint = parseInt(hex, 16);
			return codePointToSymbol(codePoint);
		});

		var overrides = {};
		keys = keys.forEach(function(codePoint, index) {
			var symbol = codePointToSymbol(codePoint);
			var correspondingValue = values[index];
			var mapsToItself = symbol == correspondingValue;
			var alreadyMarkedAsInvalid = codePoints.indexOf(codePoint) > -1;
			if (mapsToItself && !alreadyMarkedAsInvalid) {
				codePoints.push(codePoint);
				return;
			}
			if (!mapsToItself || !alreadyMarkedAsInvalid) {
				overrides[codePoint] = correspondingValue;
			}
		});

		// Pass everything back to PhantomJS
		return {
			'overrides': overrides,
			// When passed as an array, it comes out as an object, so pass it as a
			// comma-separated string instead
			'codePoints': codePoints.join(',')
		};

	});

	writeJSON('data/decode-map-overrides.json', jsesc(result.overrides, {
		'json': true,
		'compact': false
	}));

	var codePoints = result.codePoints.split(',').map(function(string) {
		return parseInt(string, 10);
	}).sort(function(a, b) {
		return a - b;
	});
	writeJSON('data/invalid-code-points.json', jsesc(codePoints, {
		'json': true,
		'compact': false
	}));

	phantom.exit();
});
