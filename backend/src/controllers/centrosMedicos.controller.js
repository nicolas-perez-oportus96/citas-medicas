//Controller para route 'centrosMedicos.js'
//-----------------------------------------//

//libraries
const CentroMedico = require('../models/CentroMedico');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const cmsCtrl = {};

//FUNCIONES

//iniciar Sesion
cmsCtrl.login = async (req, res) => {
    //recibiendo datos de la peticion
    const { rut_admin, password } = req.body
    //buscando usuario
    const centroMedico = await CentroMedico.findOne({ rut_admin: rut_admin })
    if (!centroMedico) {
        return res.json({
            auth: false,
            message: 'Centro Medico no Registrado'
        });
    }

    //validando password
    const passwordIsValid = await centroMedico.validatePassword(password)
    if (!passwordIsValid) {
        res.json({ auth: false, message: 'Contraseña incorrecta', token: null })
    }
    //generando token
    const token = jwt.sign({ centroID: centroMedico._id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60
    });

    res.json({ auth: true, message: 'sesion iniciada', token })
};

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
    const centroMedico = await CentroMedico.findOne({ rut_admin })

    if (centroMedico) {
        return res.json({ title: "Registro no finalizado.", message: 'Centro medico ya registrado. Intente iniciar sesion.', auth: false })
    } else {
        const newCentroMedico = new CentroMedico({
            rut_admin,
            password,
            nombre_cm,
            ubicacion,
            direccion,
            telefono,
            correo,
            areasMedicas: [],
            citas: []
        });
        //Encriptando contraseña
        newCentroMedico.password = await newCentroMedico.encryptPassword(newCentroMedico.password)
        await newCentroMedico.save()

        const token = jwt.sign({ id: newCentroMedico._id }, process.env.JWT_SECRET, {
            expiresIn: 60 * 60
        })
        res.json({ title: "Registro completado!", message: 'El registro del centro de atencion medica ha sido completado exitosamente. Ya puedes iniciar sesion.', auth: true, token })
    }
};

//consultar centro medico (por id)
cmsCtrl.getCM = async (req, res) => {
    console.log(req.centroID)
    try {
        const centroMedico = await CentroMedico.findById(req.centroID)
        if (!centroMedico) {
            return res.status(404).send('CM no encontrado')
        }
        res.json(centroMedico)
    } catch (e) {
        res.status(204).send(); //Centro Medico no encontrado
    }
}


//Actualizar datos centro medico (por id)
cmsCtrl.updateCM = async (req, res) => {
    var password = req.body.password
    const { rut_admin, nombre_cm, ubicacion, direccion, telefono, correo } = req.body;
    const cm_id = req.params.id_cm

    //validacion simple
    if (!rut_admin || !password || !nombre_cm || !direccion || !telefono || !correo) {
        return res.json({
            message: 'datos faltantes'
        });
    };

    console.log(cm_id)
    console.log(req.centroID)

    if (cm_id != req.centroID) {
        return res.status(500).send({ auth: false, message: 'No tienes permisos para acceder a esta ruta' });
    }

    //BCRYPT: rehash de nueva contraseña
    await bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            password = hash;
            //almacenando centroMedico
            await CentroMedico.findByIdAndUpdate(cm_id, {
                rut_admin,
                password,
                nombre_cm,
                ubicacion,
                direccion,
                telefono,
                correo
            }, { new: true }, (err, cmUpdate) => {
                if (err) return res.status(500).send({ message: 'Request Error' });

                if (!cmUpdate) return res.status(404).send({ message: 'No se pudo actualizar CM' })

                return res.status(200).json({ message: 'Centro medico modificado', cmUpdate });
            });
        })
    })
};

//Eliminar Centro Medico
cmsCtrl.deleteCM = async (req, res) => {
    try {
        await CentroMedico.findByIdAndDelete(req.params.id_cm);
        res.json({ message: 'Centro medico eliminado' })
    } catch (e) {
        res.status(404).send()
    }
}

///Ver areas medicas de un CM
cmsCtrl.getAreasMedicas = async (req, res) => {
    try {
        const centroMedico = await CentroMedico.findById(req.centroID)
        res.json(centroMedico.areasMedicas)
    } catch (e) {
        res.json({
            status: 0,
            message: "CM no registra areas medicas"
        }); //Areasmedicas no encontradas
    }
}

//agregar areaMedica a un CM.
cmsCtrl.createAreaMedica = async (req, res) => {
    try {
        const centroMedico = await CentroMedico.findById(req.centroID)
        centroMedico.areasMedicas.push(req.body.areaMedica)
        var nuevaAM = centroMedico.areasMedicas[0];
        nuevaAM.isNew;

        await centroMedico.save(function (err) {
            if (err) return handleError(err)
            res.json({
                message: 'Area medica agregada'
            });

        });
    } catch (e) {
        res.status(404).send()
    }
};


///Ver area medica de un CM
cmsCtrl.getAreaMedica = async (req, res) => {
    try {
        const centroMedico = await CentroMedico.findById(req.centroID)
        if (!centroMedico) {
            res.status(204).send(); //centroMedico no encontrado
        } else {
            const areaMedica = centroMedico.areasMedicas.id(req.params.id_area)
            if (!areaMedica) {
                res.status(204).send(); //centroMedico no encontrado
            } else {
                res.json(areaMedica)
            }
        }
    } catch (e) {
        res.status(204).send(); //Areasmedicas no encontradas
    }
}


//modificar areaMedica de un CM.
cmsCtrl.editAreaMedica = async (req, res) => {
    try {
        const centroMedico = await CentroMedico.findById(req.centroID)
        const areaMedica = centroMedico.areasMedicas.id(req.params.id_area)

        areaMedica.set(req.body);

        await centroMedico.save(function (err) {
            if (err) return handleError(err)
            res.json({
                message: 'Area medica modificada'
            });
        });
    } catch (e) {
        res.status(404).send()
    }

};

//eliminar areaMedica de un CM.
cmsCtrl.deleteAreaMedica = async (req, res) => {
    try {
        const centroMedico = await CentroMedico.findById(req.centroID)
        centroMedico.areasMedicas.id(req.params.id_area).remove();

        await centroMedico.save(function (err) {
            if (err) return handleError(err)
            res.json({
                message: 'Area medica eliminada'
            });
        });
    } catch (e) {
        res.status(404).send()
    }
}


//agregar cita a un CM.
cmsCtrl.createCita = async (req, res) => {
    const centroMedico = await CentroMedico.findById(req.centroID)
    if (!centroMedico) {
        res.status(404).json({ message: 'Centro medico no encontrado' })
    }
    centroMedico.citas.push(req.body.cita);
    var nuevaCita = centroMedico.citas[0];
    nuevaCita.isNew;

    await centroMedico.save(function (err) {
        if (err) return handleError(err)
        res.json({
            message: 'cita agregada'
        });

    });
};


///Ver citas medicas de un CM
cmsCtrl.getCitas = async (req, res) => {
    try {
        const centroMedico = await CentroMedico.findById(req.centroID)
        res.json(centroMedico.citas)
    } catch (e) {
        res.status(204).send(); //Areasmedicas no encontradas
    }
}


///Ver cita medica de un CM
cmsCtrl.getCita = async (req, res) => {
    try {
        const centroMedico = await CentroMedico.findById(req.centroID)
        if (!centroMedico) {
            res.status(204).send(); //centroMedico no encontrado
        } else {
            const areaMedica = centroMedico.citas.id(req.params.id_cita)
            if (!areaMedica) {
                res.status(204).send(); //centroMedico no encontrado
            } else {
                res.json(areaMedica)
            }
        }
    } catch (e) {
        res.status(204).send(); //Areasmedicas no encontradas
    }
}


//modificar cita medica de un CM.
cmsCtrl.editCita = async (req, res) => {
    try {
        const centroMedico = await CentroMedico.findById(req.centroID)
        const cita = centroMedico.citas.id(req.params.id_cita)

        cita.set(req.body);

        await centroMedico.save(function (err) {
            if (err) return handleError(err)
            res.json({
                message: 'Cita medica modificada'
            });
        });
    } catch (e) {
        res.status(404).send()
    }

};

//eliminar cita de un CM.
cmsCtrl.deleteCita = async (req, res) => {
    try {
        const centroMedico = await CentroMedico.findById(req.centroID)
        centroMedico.citas.id(req.params.id_cita).remove();

        await centroMedico.save(function (err) {
            if (err) return handleError(err)
            res.json({
                message: 'Cita eliminada'
            });
        });
    } catch (e) {
        res.status(404).send()
    }
}

//ver centros medicos por ciudad
cmsCtrl.getCityCMS = async (req, res) => {
    const centrosMedicos = await CentroMedico.find({ "ubicacion.ciudad._id": req.params.id_ciudad }, 'nombre_cm')
    return res.json(centrosMedicos)
}

module.exports = cmsCtrl;