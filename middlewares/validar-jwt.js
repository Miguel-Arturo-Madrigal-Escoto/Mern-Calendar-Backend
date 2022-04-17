
const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req = request, res = response, next) => {

    // x-token header (se manda en los headers del postman)
    // el x-token es el retornado por un /new o /
    const token = req.header('x-token')
    // clave secreta de JWT
    const { SECRET_JWT_SEED } = process.env;


    // El token NO fue enviado
    if (!token){
        // 401: no autenticado
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    //? Validar token
    try {
        /*
            payload: {
                uid, name, iat, exp
            }
        */
       // jwt.verify(token enviado (token generado por / o /new), clave secreta)
        const { uid, name } = jwt.verify(token, SECRET_JWT_SEED);

        //? Modificar los parametros del req (request)
        req.uid = uid;
        req.name = name;

        
    } catch (error) {
        //! Token inválido
        return res.status(401).json({
            ok: false,
            msg: 'Token inválido'
        });
    }

    next();
}

module.exports = { validarJWT };