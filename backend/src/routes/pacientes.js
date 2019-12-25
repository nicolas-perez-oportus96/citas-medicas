//Router para '/api/paciente'

const { Router } = require('express');
const router = Router();

//Controllers
const { loginPaciente, getPacientes, getPaciente, registerPaciente, updatePaciente, deletePaciente } = require('../controllers/pacientes.controller');
const { createCita, getCitas, getCita, editCita, deleteCita } = require('../controllers/centrosMedicos.controller')


//@ Route: /api/paciente/
router.route('/')

//Ver pacientes (getPacientes)
// Access: private
.get(getPacientes)


//@ Route: /api/paciente/register
router.route('/register')
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


//@ Route: /:id_paciente/cm/:id_cm/citas
router.route('/citas/cm/:id_cm/')

//Ver citas
// Access: private
.get(getCitas)

//Crear cita
// Access: private
.post(createCita)



//@ Route: /api/paciente/:id_paciente/cm/:id_cm/citas/:id_cita
router.route('/citas/cm/:id_cm/:id_cita')

//Ver cita
// Access: private
.get(getCita)

//Modificar Cita
// Access: private
.put(editCita)

//Eliminar Cita
// Access: private
.delete(deleteCita)

module.exports = router;