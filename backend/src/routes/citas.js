//Router para 'api/citas'
const { Router } = require('express');
const router = Router();

const { getCitas, createCita, getCita, updateCita, deleteCita } = require('../controllers/citas.controller')

router.route('/')
    //Consultar citas
    .get(getCitas)

    //Crear nueva cita
    .post(createCita)


router.route('/:id')
    //Consultar cita
    .get(getCita)

    //Actualizar cita
    .put(updateCita)

    //Eliminar cita
    .delete(deleteCita)


module.exports = router;