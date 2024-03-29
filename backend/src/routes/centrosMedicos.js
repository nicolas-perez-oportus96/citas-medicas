//Router para '/api/cm'
const { Router } = require('express');
const router = Router();
const verifyToken = require('../controllers/verifyToken')

//Controllers
const { login, getCMS, getCM, registerCM, updateCM, deleteCM, getAreasMedicas, createAreaMedica, getAreaMedica, getCitasArea, editAreaMedica, deleteAreaMedica, getCityCMS } = require('../controllers/centrosMedicos.controller')

//@Route: Ver Centros Medicos
//  GET /api/cm/
//  Access: private
router.get('/', getCMS)

//@Route: Ver Centros Medicos por ciudad
//  GET /api/cm/
//  Access: private
router.get('/bycity/:id_ciudad', getCityCMS)


//@Route: Iniciar Sesion
//  POST: /api/cm/login
//  Access: private
router.post('/login', login)


//@Route: Register
//  POST: /api/cm/register
//  Access: public
router.post('/register', registerCM)


//@Route: Ver datos CM
//  GET: /api/cm/me
//  Access: private
router.get('/me/', verifyToken, getCM)


//@Route:  Modificar datos CM
//  PUT: /api/cm/me/:id_cm
//  Access: private
router.put('/me/:id_cm', verifyToken, updateCM)


//@Route: Eliminar CM
//  DELETE: /api/cm/:id_cm
//  Access: private
router.delete('/:id_cm', deleteCM);


//@Route: Ver areas medicas 
//  GET: /api/cm/me/areas
//  Access: private
router.get('/me/areas', verifyToken, getAreasMedicas)


//@Route: Crear area medica
//  POST: /api/cm/me/areas
//  Access: private
router.post('/me/areas', verifyToken, createAreaMedica)


//@Route: Ver area medica
//  GET: /api/cm/me/areas/:id_area 
//  Access: private
router.get('/me/areas/:id_area', verifyToken, getAreaMedica)


//@Route: Modificar area medica.
//  PUT: /api/cm/me/areas/:id_area 
//  Access: private
router.put('/me/areas/:id_area', verifyToken, editAreaMedica)


//@Route: Eliminar area medica
//  DELETE: /api/cm/me/areas/:id_area 
//  Access: private
router.delete('/me/areas/:id_area', verifyToken, deleteAreaMedica)


//@Route: Ver citas de area medica
//  GET: /api/cm/me/areas/:id_area/citas 
//  Access: private
router.get('/me/areas/:id_area/citas', verifyToken, getCitasArea)


module.exports = router