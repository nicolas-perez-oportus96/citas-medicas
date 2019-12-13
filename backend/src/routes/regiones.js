//Router para '/api/region'
const { Router } = require('express');
const router = Router();

const { getRegiones, createRegion, getRegion, getCiudades, createCiudad, getCiudad } = require('../controllers/regiones.controller')

router.route('/')
    //Consultar regiones
    .get(getRegiones)

    //Crear region
    .post(createRegion)


router.route('/:id_region')
    //consultar region
    .get(getRegion)


router.route('/:id_region/ciudades')
    //consultar region
    .get(getCiudades)

    .post(createCiudad)



router.route('/:id_region/:id_ciudad')
    //consultar region
    .get(getCiudad)


module.exports = router;