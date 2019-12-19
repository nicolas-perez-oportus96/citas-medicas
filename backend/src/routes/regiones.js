//Router para '/api/region'
const { Router } = require('express');
const router = Router();

const { getRegiones, createRegion, getRegion, getCiudades, createCiudad, deleteRegion } = require('../controllers/regiones.controller')


//@ Route: /api/region/
router.route('/')

    //Ver regiones (getRegiones)
    // Access: public
    .get(getRegiones)

    //Crear regiones (createRegion)
    // Access: public
    .post(createRegion)

//@ Route: /api/region/:id_region
router.route('/:id_region')

    //ver region (getRegion)
    // Access: public
    .get(getRegion)

    //Eliminar Region
    // Access: private
    .delete(deleteRegion)


//@ Route: /api/region/:id_region/cities
router.route('/:id_region/cities')

    //Ver ciudades por region (getCiudades)
    // Access: public
    .get(getCiudades)

    //Añadir ciudad de region (createCiudad)
    // Access: public
    .post(createCiudad)


module.exports = router;