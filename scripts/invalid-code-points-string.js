'use strict';

const jsesc = require('jsesc');

const invalidRawCodePoints = require('../data/invalid-raw-code-points.json');
const string = String.fromCodePoint.apply(String, invalidRawCodePoints);
const invalidCodePointsString = jsesc(string, { 'wrap': true });

module.exports = invalidCodePointsString;
