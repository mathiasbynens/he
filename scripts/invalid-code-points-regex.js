var regenerate = require('regenerate');

var invalidRawCodePoints = require('../data/invalid-raw-code-points.json');
var regexInvalidRawCodePoints = regenerate(invalidRawCodePoints).toString();

module.exports = regexInvalidRawCodePoints;
