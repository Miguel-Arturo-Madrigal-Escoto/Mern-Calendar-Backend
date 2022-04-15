//configuracion de la conexión a la bd
const mongoose = require('mongoose');

const dbConnection = async() => {

    const { DB_CNN } = process.env; 

    try {
        await mongoose.connect(DB_CNN);
    } catch (error) {
        throw new Error('Error al inicializar la BD');
    } 

}

module.exports = dbConnection;