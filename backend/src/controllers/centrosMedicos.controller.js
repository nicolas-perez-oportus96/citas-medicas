//Controller para route 'centrosMedicos.js'
const cmsCtrl = {};

//Funciones
cmsCtrl.getCMS = (req, res) => res.json({ message: [] })

cmsCtrl.getCM = (req, res) => res.json({ message: 'GET - Consultar CM' })

cmsCtrl.createCM = (req, res) => res.json({ message: 'POST - Crear nuevo CM' })

cmsCtrl.updateCM = (req, res) => res.json({ message: 'PUT - Actualizar CM' })

cmsCtrl.deleteCM = (req, res) => res.json({ message: 'DELETE - Eliminar CM' })


module.exports = cmsCtrl;