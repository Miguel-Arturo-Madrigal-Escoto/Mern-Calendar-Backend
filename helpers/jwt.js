
const jwt = require('jsonwebtoken');

//Recibir el Payload
const generarJWT = (uid, name) => {

    const { SECRET_JWT_SEED } = process.env;

    return new Promise((resolve, reject) => {

        const payload = { uid, name };

        //! (payload, private key, options, (error, token) callback)
        jwt.sign(payload, SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (err, token) => {

            if (err) {
                console.log(err)
                reject('No se pudo generar el token');
            } 
            resolve(token);
        });

    });

}

module.exports = generarJWT