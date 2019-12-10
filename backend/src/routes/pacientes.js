//Router para '/api/pacientes'

const { Router } = require('express');
const router = Router();


const { getPacientes, getPaciente, createPaciente, updatePaciente, deletePaciente } = require('../controllers/pacientes.controller')


router.route('/')
    //Consultar pacientes
    .get(getPacientes)

    //Crear nuevo paciente
    .post(createPaciente)

router.route('/:id')

    //Consultar paciente
    .get(getPaciente)

    //Actualizar paciente
    .put(updatePaciente)

    //Eliminar paciente
    .delete(deletePaciente)

module.exports = router;