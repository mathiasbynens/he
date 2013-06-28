var page = require('webpage').create();
var fs = require('fs');

function open(url, callback) {
	page.open(url, function(status) {
		if (status != 'success') {
			return phantom.exit();
		}
		callback();
	});
}

open('http://www.whatwg.org/specs/web-apps/current-work/multipage/tokenization.html#table-charref-overrides', function() {
	var result = page.evaluate(function() {
		var elements = document.querySelectorAll('#table-charref-overrides td');
		var keys = [].filter.call(elements, function(element, index) {
			return index % 3 == 0;
		}).map(function(element) {
			return Number(element.innerText.trim());
		});
		var values = [].filter.call(elements, function(element, index) {
			return index % 3 == 1;
		}).map(function(element) {
			return element.innerText.trim().replace('U+', '\\u');
		});
		var object = {};
		keys.forEach(function(key, index) {
			object[key] = values[index];
		});
		return JSON.stringify(object, null, '\t')
			.replace(/\\\\/g, '\\')
			.replace(/\\u00/g, '\\x')
			.replace(/"/g, '\'');
	});
	fs.write('data/table.js', result + '\n', 'w');
	phantom.exit();
});
