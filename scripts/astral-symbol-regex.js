'use strict';

const regenerate = require('regenerate');

const regexAstralSymbol = regenerate()
	.addRange(0x010000, 0x10FFFF)
	.toString();

module.exports = regexAstralSymbol;
