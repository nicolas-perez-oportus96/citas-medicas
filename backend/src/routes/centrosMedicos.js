//Router para '/api/cm'

const { Router } = require('express');
const router = Router();

const { getCMS, getCM, registerCM, updateCM, deleteCM, getAreasMedicas, createAreaMedica, getAreaMedica, editAreaMedica, deleteAreaMedica } = require('../controllers/centrosMedicos.controller')

//@ Route: /api/cm/
router.route('/')

//Ver Centros Medicos (getCMS)
// Access: private
.get(getCMS)


//@ Route: /api/cm/
router.route('/register')

//Register (registerCM)
// Access: public
.post(registerCM);

//@ Route: /api/cm/:id_cm
router.route('/:id_cm')

//Ver datos CM (getCM)
// Access: private
.get(getCM)

//Modificar datos CM (updateCM)
// Access: private
.put(updateCM)

//Eliminar CM (deleteCM)
// Access: private
.delete(deleteCM);


//@ Route: /api/cm/:id_cm/areas
router.route('/:id_cm/areas')

//Ver areas medicas 
// Access: private
.get(getAreasMedicas)

//crear area medica 
// Access: private
.post(createAreaMedica);


//@ Route: /api/cm/:id_cm/areas/:id_area
router.route('/:id_cm/areas/:id_area')

//Ver area medica 
// Access: private
.get(getAreaMedica)

//Modificar area medica 
// Access: private
.put(editAreaMedica)

//Eliminar area medica 
// Access: private
.delete(deleteAreaMedica);


//@ Route: /api/cm/:id_cm/areas/:id_area/citas
router.route('/:id_cm/areas/:id_area/citas')

//Ver citas de area medica 
// Access: private
.get((req, res) => res.send('Ver citas de area medica'));


module.exports = router;