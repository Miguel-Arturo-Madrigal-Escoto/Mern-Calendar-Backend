
const { Schema, model } = require('mongoose');

// schema del objeto a guardar en la bd
const UsuarioSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    uid: {
        type: String,
        unique: true,      
    }
});


// modelo del objeto a guardar en la bd. En la db se guarda
// la coleccion como 'User' → users
module.exports = model('Usuario', UsuarioSchema);