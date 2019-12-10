//Controller para route 'citas.js'

const citasCtrl = {};

//Funciones
citasCtrl.getCitas = (req, res) => res.json({ message: [] })

citasCtrl.getCita = (req, res) => res.json({ message: 'GET - Consultar Cita' })

citasCtrl.createCita = (req, res) => res.json({ message: 'POST - Crear nueva Cita' })

citasCtrl.updateCita = (req, res) => res.json({ message: 'PUT - Actualizar cita' })

citasCtrl.deleteCita = (req, res) => res.json({ message: 'DELETE - Eliminar Cita' })

module.exports = citasCtrl;