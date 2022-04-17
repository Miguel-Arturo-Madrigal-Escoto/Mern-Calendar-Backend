
const jwt = require('jsonwebtoken');

//Recibir el Payload
const generarJWT = (uid, name) => {

    // clave secreta
    const { SECRET_JWT_SEED } = process.env; 

    return new Promise((resolve, reject) => {

        const payload = { uid, name };

        //* (payload, private key, options (expiresIn: 'time'), (error, token) callback)
        jwt.sign(payload, SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (err, token) => {

            if (err) {
                reject('No se pudo generar el token');
            } 
            resolve(token);
        });

    });

}

module.exports = generarJWT;