//Controller para route 'centrosMedicos.js'
const CentroMedico = require('../models/CentroMedico');
const bcrypt = require('bcrypt');

const cmsCtrl = {};

//FUNCIONES

//Consultar Centros medicos
cmsCtrl.getCMS = async (req, res) => {
    const cms = await CentroMedico.find();
    res.json(cms);
};

//Crear nuevo centro medico (register)
cmsCtrl.registerCM = async (req, res) => {
    const { rut_admin, password, nombre_cm, ubicacion, direccion, telefono, correo } = req.body;

    //validacion simple
    if (!rut_admin || !password || !nombre_cm || !ubicacion || !direccion || !telefono || !correo) {
        return res.json({
            message: 'datos faltantes'
        });
    };


    //Verificando usuario exitente
    await CentroMedico.findOne({ rut_admin })
        .then(centroMedico => {
            if (centroMedico) return res.json({ message: 'Rut ya registrado' })

            const newCentroMedico = new CentroMedico({
                rut_admin,
                password,
                nombre_cm,
                ubicacion,
                direccion,
                telefono,
                correo
            });

            //BCRYPT: generando Salt y Hash para password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newCentroMedico.password, salt, (err, hash) => {
                    if (err) throw err;
                    newCentroMedico.password = hash;
                    newCentroMedico.save()
                        .then(centroMedico => {
                            res.json({
                                centroMedico: {
                                    id: centroMedico.id,
                                    rut_admin: centroMedico.rut_admin,
                                    nombre_cm: centroMedico.nombre_cm,
                                    ubicacion: centroMedico.ubicacion,
                                    direccion: centroMedico.direccion,
                                    telefono: centroMedico.telefono,
                                    correo: centroMedico.correo
                                }
                            });
                        });
                });
            });
        });
};

//consultar centro medico (por id)
cmsCtrl.getCM = async (req, res) => {
    try {
        const centroMedico = await CentroMedico.findById(req.params.id_cm)
        res.json(centroMedico)
    } catch (e) {
        res.status(204).send(); //Centro Medico no encontrado
    }
}



cmsCtrl.updateCM = async (req, res) => {
    var password = req.body.password
    const { rut_admin, nombre_cm, direccion, telefono, correo } = req.body;

    //validacion simple
    if (!rut_admin || !password || !nombre_cm || !direccion || !telefono || !correo) {
        return res.json({
            message: 'datos faltantes'
        });
    };

    //BCRYPT: rehash de nueva contraseña
    await bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            password = hash;
            try {
                await CentroMedico.findOneAndUpdate({ _id: req.params.id_cm }, {
                    rut_admin,
                    password,
                    nombre_cm,
                    direccion,
                    telefono,
                    correo
                });
                res.json({ message: 'Centro medico modificado' });
            } catch (e) {
                res.status(404).send()
            }
        })
    })

}

//Eliminar Centro Medico

cmsCtrl.deleteCM = async (req, res) => {
    try {
        await CentroMedico.findByIdAndDelete(req.params.id_cm);
        res.json({ message: 'Centro medico eliminado' })
    } catch (e) {
        res.status(404).send()
    }
}



module.exports = cmsCtrl;