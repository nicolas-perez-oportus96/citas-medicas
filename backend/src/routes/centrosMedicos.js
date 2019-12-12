//Router para '/api/centrosMedicos'

const { Router } = require('express');
const router = Router();

const { getCMS, getCM, registerCM, updateCM, deleteCM } = require('../controllers/centrosMedicos.controller')

router.route('/')
    //Consultar CMS
    .get(getCMS)

//Crear nuevo CM
.post(registerCM)

router.route('/:id')

//Consultar CM
.get(getCM)

//Actualizar CM
.put(updateCM)

//Eliminar CM
.delete(deleteCM)

module.exports = router;