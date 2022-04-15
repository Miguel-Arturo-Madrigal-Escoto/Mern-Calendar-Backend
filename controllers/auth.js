
const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const generarJWT = require('../helpers/jwt');

const crearUsuario = async (req = request, res = response) => {
    
    const { name, email, password } = req.body;
    
    try {
        // crear usuario a partir del modelo
        const usuario = await new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        // hashear la contraseña (password del body, salt)
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save()

        //TODO: Generar JWT
        const token = await generarJWT(usuario.id, usuario.name);

        // status 201: creado correctamente
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al registrar el usuario'
        });
    } 
}

const loginUsuario = async (req = request, res = response) => {

    const { email, password } = req.body;

    try {
        // SELECT * FROM usuarios WHERE email = email, null si no existe
        const usuario =  await Usuario.findOne({ email });
        
        // Confirmar los passwords (password del body, password de la db)
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            });
        }

        // TODO: Generar JWT (JSON Web Token)
        const token = await generarJWT(usuario.id, usuario.name);

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        });
    }   
}

const revalidarToken = async (req = request, res = response) => {
    
    
    
    res.json({
        ok: true,
        msg: 'renew'
    });
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}