
const { request } = require('express');

const areValidDates = (value, { req = request}) => value >= req.body.start;

module.exports = { areValidDates };