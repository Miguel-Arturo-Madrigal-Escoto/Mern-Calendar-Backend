
const { request, response } = require('express');
const { validationResult } = require('express-validator');


//next es un callback que se debe llamar si todo se ejecuta correctamente
const validarCampos = (req = request, res = response, next) => {

    const errors = validationResult(req);
    
    if (!errors.isEmpty()){
        // si hay errores se manda un json y status 400
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    // si no hay errores, pasa al siguiente middleware con next
    next();
}

module.exports = { 
    validarCampos 
}