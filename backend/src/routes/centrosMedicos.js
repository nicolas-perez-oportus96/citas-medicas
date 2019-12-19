//Router para '/api/cm'

const { Router } = require('express');
const router = Router();

const { getCMS, getCM, registerCM, updateCM, deleteCM } = require('../controllers/centrosMedicos.controller')

//@ Route: /api/cm/
router.route('/')

    //Ver Centros Medicos (getCMS)
    // Access: private
    .get(getCMS)

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
    .get((req, res) => res.send('Ver areas medicas'))

    //crear area medica 
    // Access: private
    .post((req, res) => res.send('Crear area medica '));


//@ Route: /api/cm/:id_cm/areas/:id_area
router.route('/:id_cm/areas/:id_area')

    //Ver area medica 
    // Access: private
    .get((req, res) => res.send('Ver area medica'))

    //Modificar area medica 
    // Access: private
    .put((req, res) => res.send('Modificar area medica'))

    //Eliminar area medica 
    // Access: private
    .delete((req, res) => res.send('Eliminar area medica'));


//@ Route: /api/cm/:id_cm/areas/:id_area/citas
router.route('/:id_cm/areas/:id_area/citas')

    //Ver citas de area medica 
    // Access: private
    .get((req, res) => res.send('Ver citas de area medica'));


module.exports = router;