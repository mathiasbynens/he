var page = require('webpage').create();
var fs = require('fs');
var stringEscape = require('string-escape');

var open = function(url, callback) {
	page.open(url, function(status) {
		if (status != 'success') {
			return phantom.exit();
		}
		callback();
	});
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
		var elements = document.querySelectorAll('#table-charref-overrides td');
		var keys = [].filter.call(elements, function(element, index) {
			return index % 3 == 0;
		}).map(function(element) {
			return Number(element.innerText.trim());
		});
		var values = [].filter.call(elements, function(element, index) {
			return index % 3 == 1;
		}).map(function(element) {
			var hex = element.innerText.trim().replace('U+', '');
			var codePoint = parseInt(hex, 16);
			return codePointToSymbol(codePoint);
		});
		var object = {};
		keys.forEach(function(key, index) {
			object[key] = values[index];
		});
		return object;
	});
	var json = stringEscape(result, {
		'json': true,
		'compact': false
	}) + '\n';
	fs.write('data/decode-overrides.json', json, 'w');
	console.log('data/decode-overrides.json created successfully.');
	phantom.exit();
});
