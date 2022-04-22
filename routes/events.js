
/*
    127.0.0.1:PORT/api/events + route
*/

const { Router } = require('express');
const { check, body } = require('express-validator');
const router = Router();

// Controllers
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { getEventById } = require('../helpers/getEventById');
const { areValidDates } = require('../helpers/validarFecha');
//const { isDate } = require('../helpers/isDate');

// Middlewares
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// Todos los endpoint debe de pasar la validacion del JWT

router.use(validarJWT);

// Obtener eventos
router.get(
    '/',
    [],
    getEventos
);

// Crear nuevo evento
router.post(
    '/',
    [
        // values -> req.body
        check('title', 'El titulo es requerido').not().isEmpty(),
        check('start', 'Fecha de inicio invalida').isISO8601().toDate(),
        check('end','Fecha de finalizacion invalida').isISO8601().toDate()
        .custom(areValidDates).withMessage('Fecha de inicio y/o finalización invalidas'),
        validarCampos
    ],
    crearEvento
)

// Actualizar evento
router.put(
    '/:id',
    [
        // values -> req.body
        check('id', 'id invalido').isMongoId()
        .custom(async eventId => {
            const evento = await getEventById(eventId);
            if (!evento)
                return Promise.reject();
        }).withMessage('No existe un evento con ese id')
        .custom(async (eventId, { req }) => {
            const evento = await getEventById(eventId);
            if (evento.user.toString() !== req.uid)
                return Promise.reject()
        }).withMessage('No tiene autorizacion para modificar el evento'),
        check('title', 'El titulo es requerido').not().isEmpty(),
        check('start', 'Fecha de inicio invalida').isISO8601().toDate(),
        check('end', 'Fecha de finalizacion invalida').isISO8601().toDate()
        .custom(areValidDates).withMessage('Fecha de inicio y/o finalización invalidas'),
        validarCampos
    ],
    actualizarEvento
)

// Borrar evento
router.delete('/:id',
    [
        check('id', 'id inválido').isMongoId()
        .custom(async eventId => {
            const evento = await getEventById(eventId);
            if (!evento)
                return Promise.reject()
        }).withMessage('No existe un evento con ese id')
        .custom(async (eventId, { req }) => {
            const evento = await getEventById(eventId);
            if (evento.user.toString() !== req.uid)
                return Promise.reject()
        }).withMessage('No tiene autorizacion para eliminar el evento'),
        validarCampos
    ],
    eliminarEvento
)


module.exports = router;