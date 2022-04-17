
const { Schema, model } = require('mongoose');

const EventoSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        // el tipo del usuario debe ser un objectid
        type: Schema.Types.ObjectId,
        // referencia al modelo Usuario (opcional)
        ref: 'Usuario',
        required: true
    }

});

// Modificar la serialización toJSON para _id -> id
/* EventoSchema.method('toJSON,', function() {
    const {  __v, _id, ...object } = this.toObject();        // referencia al objeto serializado
    object.id = _id;
    return {};
}); */

module.exports = model('Evento', EventoSchema);