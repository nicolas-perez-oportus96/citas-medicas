//Router para '/api/paciente'

const { Router } = require('express');
const router = Router();
const verifyToken = require('../controllers/verifyToken')

//Controllers
const { loginPaciente, getPacientes, getPaciente, registerPaciente, updatePaciente, deletePaciente } = require('../controllers/pacientes.controller');
const { createCita, getCitas, getCita, editCita, deleteCita } = require('../controllers/centrosMedicos.controller')


//@Route: Ver pacientes (getPacientes)
//  GET /api/paciente/
//  Access: public (dejar publico para pruebas)
router.get('/', getPacientes)


//@Route: Login
//  POST /api/paciente/login
//  Access: public
router.post('/login', loginPaciente)


//@Route: Register
//  POST /api/paciente/register
//  Access: public
router.post('/register', registerPaciente)


//@Route: Ver datos personales
//  GET /api/paciente/:id_paciente
//  Access: private 
router.get('/me/', verifyToken, getPaciente)


//@Route: Modificar datos personales (updatePaciente)
//  PUT /api/paciente/:id_paciente
//  Access: private
router.put('/me/:id_paciente', verifyToken, updatePaciente)


//@Route: Eliminar paciente
//  DELETE /api/paciente/:id_paciente
//  Access: private (dejar publico para pruebas)
router.delete('/me/:id_paciente', deletePaciente)


//@Route: Ver citas
//  GET /:id_paciente/cm/:id_cm/citas
//  Access: private
router.get('/me/citas/', (req, res) => res.send('ver citas'))


//@Route: Crear citas
//  POST /:id_paciente/cm/:id_cm/citas
//  Access: private
router.post('/me/citas/', (req, res) => res.send('crear cita'))


//@Route: Ver cita
//  GET /api/paciente/:id_cita
//  Access: private
router.get('/me/citas/:id_cita', (req, res) => res.send('ver cita'))


//@Route: Modificar Cita 
//  PUT /api/paciente/citas/cm/:id_cm/:id_cita
//  Access: private
router.put('/me/citas/:id_cita', (req, res) => res.send('editar cita'))


//@Route: Eliminar Cita 
//  DELETE /api/paciente/citas/cm/:id_cm/:id_cita
//  Access: private
router.delete('/me/citas/:id_cita', (req, res) => res.send('Eliminar cita'))

module.exports = router;