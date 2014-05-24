var regenerate = require('regenerate');

var regexAstralSymbol = regenerate()
	.addRange(0x010000, 0x10FFFF)
	.toString();

module.exports = regexAstralSymbol;
