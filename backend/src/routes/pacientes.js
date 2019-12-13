//Router para '/api/pacientes'

const { Router } = require('express');
const router = Router();


const { loginPaciente, getPacientes, getPaciente, registerPaciente, updatePaciente, deletePaciente } = require('../controllers/pacientes.controller')


router.route('/')
    //Consultar pacientes
    .get(getPacientes)

    //Crear nuevo paciente
    .post(registerPaciente)

router.route('/:id')
    //Consultar paciente
    .get(getPaciente)

    //Actualizar paciente
    .put(updatePaciente)

    //Eliminar paciente
    .delete(deletePaciente)

module.exports = router;