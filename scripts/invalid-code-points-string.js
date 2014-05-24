var jsesc = require('jsesc');
require('string.fromcodepoint');

var invalidRawCodePoints = require('../data/invalid-raw-code-points.json');
var string = String.fromCodePoint.apply(String, invalidRawCodePoints);
var invalidCodePointsString = jsesc(string, { 'wrap': true });

module.exports = invalidCodePointsString;
