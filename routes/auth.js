/*
    Rutas de Usuarios /auth
    127.0.0.1:PORT/api/auth + route
*/

const { Router } = require('express');
// validacion de campos (middleware)
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { crearUsuario, loginUsuario, revalidarToken, loginWithSocialNetworks } = require('../controllers/auth');
const { getUserByEmail } = require('../helpers/getUserByEmail');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router()

// Rutas (req, res) , varios middlewares -> []
// Nota: el custom middleware va como último argumento de los middlewares
router.post(
    '/new',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El correo es invalido').isEmail()
        .custom(async (email) => {
            const usuario = await getUserByEmail(email);
            // si existe un usuario con ese correo, mandar un error
            if (!!usuario)
                return Promise.reject();

        }).withMessage('Usuario existente con dicho email'),
        check('password', 'La contraseña no cumple con los requerimientos').isStrongPassword(),
        validarCampos
    ], 
    crearUsuario
);

router.post('/', 
    [
        check('email', 'El correo es invalido').isEmail()
        .custom(async (email) => {
            const usuario = await getUserByEmail(email);
            // si no existe un usuario con ese correo, no login
            if (!usuario)
                return Promise.reject();

        }).withMessage('Usuario y/o contraseña incorrectos'),
        check('password', 'La contraseña es obligatoria').exists(),
        validarCampos
    ],
    loginUsuario
);

// Login with social networks
router.post(
    '/login',
    [
        check('uid', 'El id es requerido').exists(),
        check('name', 'El nombre es obligatorio').exists(),
        check('email', 'El correo es invalido').isEmail(),
        validarCampos
    ],
    loginWithSocialNetworks
)

router.get('/renew',
    validarJWT, 
    revalidarToken
);

// Habilitar rutas
module.exports = router;
