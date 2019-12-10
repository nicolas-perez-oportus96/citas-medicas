//Controller para route 'pacientes.js'
const pacientesCtrl = {};

//Funciones
pacientesCtrl.getPacientes = (req, res) => res.json({ message: [] })

pacientesCtrl.getPaciente = (req, res) => res.json({ message: 'GET - Consultar paciente' })

pacientesCtrl.createPaciente = (req, res) => res.json({ message: 'POST - Crear nuevo paciente' })

pacientesCtrl.updatePaciente = (req, res) => res.json({ message: 'PUT - Actualizar paciente' })

pacientesCtrl.deletePaciente = (req, res) => res.json({ message: 'DELETE - Eliminar paciente' })

module.exports = pacientesCtrl;