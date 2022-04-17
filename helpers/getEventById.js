
const Evento = require('../models/Evento');

const getEventById = (id) => Evento.findById(id);

module.exports = { getEventById };