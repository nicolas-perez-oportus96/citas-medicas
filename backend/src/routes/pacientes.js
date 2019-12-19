//Router para '/api/paciente'

const { Router } = require('express');
const router = Router();


const { loginPaciente, getPacientes, getPaciente, registerPaciente, updatePaciente, deletePaciente } = require('../controllers/pacientes.controller')

//@ Route: /api/paciente/
router.route('/')

    //Ver pacientes (getPacientes)
    // Access: private
    .get(getPacientes)

    //Register (registerPaciente)
    // Access: public
    .post(registerPaciente)




//@ Route: /api/paciente/:id_paciente
router.route('/:id_paciente')

    //Ver datos personales (getPaciente)
    // Access: private
    .get(getPaciente)

    //Modificar datos personales (updatePaciente)
    // Access: private
    .put(updatePaciente)

    //Eliminar Paciente (deletePaciente)
    // Access: private
    .delete(deletePaciente)


//@ Route: /api/paciente/:id_paciente/citas
router.route('/:id_paciente/citas')

    //Ver citas
    // Access: private
    .get((req, res, next) => res.send('Ver citas'))

    //Crear cita
    // Access: private
    .post((req, res) => res.send('Crear cita'))



//@ Route: /api/paciente/:id_paciente/citas/:id_cita
router.route('/:id_paciente/citas/:id_cita')

    //Ver cita
    // Access: private
    .get((req, res) => res.send('Ver cita'))

    //Modificar Cita
    // Access: private
    .put((req, res) => res.send('Modificar Cita'))

    //Eliminar Cita
    // Access: private
    .delete((req, res) => res.send('Eliminar Cita'))

module.exports = router;