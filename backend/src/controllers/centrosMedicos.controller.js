//Controller para route 'centrosMedicos.js'
//-----------------------------------------//

//libraries
const CentroMedico = require('../models/CentroMedico');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const cmsCtrl = {};

//FUNCIONES

//iniciar Sesion (OK!)
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
    const token = jwt.sign({ admin: true, centroID: centroMedico._id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60
    });

    res.json({ auth: true, message: 'sesion iniciada', token })
};

//Consultar Centros medicos (OK!)
cmsCtrl.getCMS = async (req, res) => {
    const cms = await CentroMedico.find();
    res.json(cms);
};

//Crear nuevo centro medico (register) (OK!)
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

//consultar centro medico (por id)  (OK!)
cmsCtrl.getCM = async (req, res) => {
    const centroMedico = await CentroMedico.findById(req.centroID)
    if (!centroMedico) {
        return res.json({message: 'CM no encontrado'})
    }
    res.json(centroMedico)
};

//Actualizar datos centro medico (por id)  (OK!)
cmsCtrl.updateCM = async (req, res) => {
    const { nombre_cm, correo, telefono, direccion } = req.body;
    const centro_id = req.params.id_cm

    //validacion simple
    if ( !nombre_cm || !correo || !telefono || !direccion ) {
        return res.json({
            message: 'datos faltantes'
        });
    };

    if (centro_id != req.centroID) {
        return res.status(500).json({
            auth: false,
            message: 'No tienes permisos para acceder a esta ruta'
        });
    }

    //almacenando centroMedico
    await CentroMedico.findByIdAndUpdate(req.centroID, {
        nombre_cm,
        direccion,
        telefono,
        correo
    }, { new: true }, (err, cmUpdate) => {
        if (err) return res.json({ status: 0, message: 'Request Error' });

        if (!cmUpdate) return res.json({ status: 0, message: 'No se pudo actualizar CM' })

        return res.json({ status: 1, message: 'Centro medico modificado', cmUpdate });
    });
};

//Eliminar Centro Medico (OK!)
cmsCtrl.deleteCM = async (req, res) => {
    try {
        await CentroMedico.findByIdAndDelete(req.params.id_cm);
        res.json({ message: 'Centro medico eliminado' })
    } catch (e) {
        res.status(404).send()
    }
};

///Ver areas medicas de un CM (OK!)
cmsCtrl.getAreasMedicas = async (req, res) => {
    const centroMedico = await CentroMedico.findById(req.centroID)
    if(!centroMedico) {
        res.json({
            status: 0,
            message: "CM no registra areas medicas"
        }); //Areasmedicas no encontradas
    }
    res.json(centroMedico.areasMedicas)   
};

//agregar areaMedica a un CM (OK!)
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

///Ver area medica de un CM (OK!)
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
};

//modificar areaMedica de un CM (OK!)
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

//eliminar areaMedica de un CM (OK!)
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
};

//agregar cita a un CM. (OK!)
cmsCtrl.createCita = async (req, res) => {
    const centroMedico = await CentroMedico.findById(req.centroID)
    if (!centroMedico) {
        res.json({ message: 'Centro medico no encontrado' })
    }
    centroMedico.citas.push(req.body.cita);
    var nuevaCita = centroMedico.citas[0];
    nuevaCita.isNew;

    await centroMedico.save(function (err) {
        if (err) return handleError(err)
        res.json({
            status: 'ok',
            message: 'cita agregada'
        });

    });
};

//ver citas por area medica (OK!)
cmsCtrl.getCitasArea = async (req, res) => {
    const centroMedico = await CentroMedico.findById(req.centroID);
    const citas = centroMedico.citas
    const citasArea = []
    for (i in citas) {
        if (citas[i].areaMedica.id == req.params.id_area) {
            citasArea.push(citas[i])
        }
    }
    res.json(citasArea)
};

///Ver citas medicas de un paciente (OK!)
cmsCtrl.getCitasPaciente = async (req, res) => {
    const centroMedico = await CentroMedico.findById(req.centroID);
    const citas = centroMedico.citas
    const citasPaciente = []
    for (i in citas) {
        if (citas[i].paciente.id == req.pacienteID) {
            citasPaciente.push(citas[i])
        }
    }
    res.json(citasPaciente)
};

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
};

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

//eliminar cita de un CM. (OK!)
cmsCtrl.deleteCita = async (req, res) => {
    const centroMedico = await CentroMedico.findById(req.centroID)
    centroMedico.citas.id(req.params.id_cita).remove();

    await centroMedico.save(function (err) {
        if (err) return handleError(err)
        res.json({
            status: 1,
            message: 'Cita eliminada'
        });
    });
};

//ver centros medicos por ciudad
cmsCtrl.getCityCMS = async (req, res) => {
    const centrosMedicos = await CentroMedico.find({ "ubicacion.ciudad._id": req.params.id_ciudad }, 'nombre_cm')
    return res.json(centrosMedicos)
};



module.exports = cmsCtrl;