
const { request, response } = require('express');

// Modelo
const Evento = require('../models/Evento');

const getEventos = async (req = request, res = response) => {

    // populate: rellena la info. del campo especificado si este hace referencia a un ObjectId
    // ej: user, nota: solo es en la respuesta, no en la base de datos
    // .find({}).populate(arg1, 'arg2'), arg1: campo a popular, arg2 (opcional): cadena con los campos que populan separados con espacio;

    try {
        const eventos = await Evento.find({}).populate('user',  'name');

        res.status(200).json({
            ok: true,
            eventos
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al obtener los eventos'
        });
    }
      
}

const crearEvento = async (req = request, res = response) => {

    const evento = await new Evento(req.body);
    
    try {
        evento.user = req.uid;

        const eventoGuardado = await evento.save();


        res.status(201).json({
            ok: true,
            event: eventoGuardado
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        });
    }

}

const actualizarEvento = async (req = request, res = response) => {

    const eventoId = req.params.id; // url
    const usuarioId = req.uid;     // middleware validar-jwt

    try {

        // cuando se actualiza retorna el evento viejo y en la segunda peticion el nuevo
        const nuevoEvento = {
            ...req.body,
            user: usuarioId
        }

        const eventoDB = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true });
        // .findOneAndUpdate(query, nueva data, { new: true })
        //const eventoDB = await Evento.findOneAndUpdate({ _id: eventoId }, nuevoEvento, { new: true })

        return res.status(200).json({
            ok: true,
            evento: eventoDB
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        });
    }

    res.json({
        ok: true,
        msg: 'actualizarEvento',
        id: req.params.id
    });

}

const eliminarEvento = async (req = request, res = response) => {

    const eventoId = req.params.id;

    try {
        
        const eventoDB = await Evento.findByIdAndDelete(eventoId);

        res.status(200).json({
            ok: true,
            evento: eventoDB
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        });
    }

}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}