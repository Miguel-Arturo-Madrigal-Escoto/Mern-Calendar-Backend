const Usuario = require('../models/Usuario');

const getUserByEmail = (email) => Usuario.findOne({ email });

module.exports = { getUserByEmail };