//Controller para route 'regiones.js'
const Region = require('../models/Region');

const regionesCtrl = {};

//FUNCIONES

//Consultar regiones
regionesCtrl.getRegiones = async(req, res) => {
    const regiones = await Region.find();
    res.json(regiones);
};

//Crear nueva Region
regionesCtrl.createRegion = async(req, res) => {
    const { nombre, ciudad } = req.body;

    //validacion simple 
    if (!nombre || !ciudad) {
        return res.json({
            message: 'Datos faltantes'
        });
    }

    const newRegion = new Region({
        nombre,
        ciudad
    });

    //guardando datos
    newRegion.save()
        .then(region => {
            res.json({
                Region: {
                    nombre: region.nombre,
                    ciudad: region.ciudad
                }
            });
        });
};


//Consultar una region 
regionesCtrl.getRegion = async(req, res) => {
    try {
        const region = await Region.findById(req.params.id_region)
        res.json(region)
    } catch (e) {
        res.status(204).send(); //Region no encontrada
    }
}

///Consultar ciudades de una region
regionesCtrl.getCiudades = async(req, res) => {
    try {
        const region = await Region.findById(req.params.id_region)
        res.json(region.ciudad)
    } catch (e) {
        res.status(204).send(); //Ciudades no encontradas
    }
}

//agregar una ciudad a una region
regionesCtrl.createCiudad = async(req, res) => {
    try {
        const region = await Region.findById(req.params.id_region)
        region.ciudad.push(req.body.ciudad)
        var nuevaCiudad = region.ciudad[0];
        nuevaCiudad.isNew;

        await region.save(function(err) {
            if (err) return handleError(err)
            res.json({
                message: 'Ciudad agregada'
            });

        });
    } catch (e) {
        res.status(404).send()
    }

};


//Eliminar Region
regionesCtrl.deleteRegion = async(req, res) => {
    try {
        await Region.findByIdAndDelete(req.params.id_region);
        res.json({ message: 'Region Eliminada' });
    } catch (e) {
        res.status(404).send()
    }

};

module.exports = regionesCtrl