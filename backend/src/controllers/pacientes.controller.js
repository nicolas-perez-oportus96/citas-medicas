//Controller para route 'pacientes.js'
//------------------------------------//
const Paciente = require('../models/Paciente');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const pacientesCtrl = {};

//FUNCIONES

//Iniciar sesion
pacientesCtrl.loginPaciente = async (req, res) => {
    //recibiendo datos de la peticion
    const { rut, password } = req.body
    //buscando paciente
    const paciente = await Paciente.findOne({ rut: rut })
    //validando paciente no encontrado
    if (!paciente) {
        return res.json({
            message: 'Paciente no registrado'
        });
    }

    //validando password
    const passwordIsValid = await paciente.validatePassword(password)
    if (!passwordIsValid) {
        res.status(401).json({
            auth: false,
            message: 'Contraseña incorrecta',
            token: null
        })
    }
    //generando token
    const token = jwt.sign({ pacienteID: paciente._id, centroID: paciente.centroMedico.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60
    });
    res.json({
        auth: true,
        message: 'Sesion iniciada',
        token
    })
}


//Consultar pacientes
pacientesCtrl.getPacientes = async (req, res) => {
    const pacientes = await Paciente.find();
    res.json(pacientes);
};

//Crear nuevo paciente (Register)
pacientesCtrl.registerPaciente = async (req, res) => {
    const { rut, password, nombres, apellidos, fecha_nacimiento, ubicacion, centroMedico, telefono, correo } = req.body;

    //Validacion simple
    if (!rut || !password || !nombres || !apellidos || !ubicacion || !centroMedico || !fecha_nacimiento) {
        return res.json({
            message: 'Datos faltantes'
        });
    };

    //Validando usuario existente
    const paciente = await Paciente.findOne({ rut })
    if (paciente) {
        return res.json({
            message: 'Usuario ya existente'
        });
    } else {
        const newPaciente = new Paciente({
            rut,
            password,
            nombres,
            apellidos,
            fecha_nacimiento,
            ubicacion,
            centroMedico,
            telefono,
            correo
        });

        //BCRYPT: generando Salt y Hash para password
        newPaciente.password = await newPaciente.encryptPassword(newPaciente.password)
        await newPaciente.save()

        //generando token
        const token = jwt.sign({ pacienteID: newPaciente._id, centroID: newPaciente.centroMedico.id }, process.env.JWT_SECRET, {
            expiresIn: 60 * 60
        });
        res.json({
            auth: true,
            message: 'Paciente registrado exitosamente! Ya puedes iniciar sesion.',
            token
        })
    }
};

//Consultar paciente (por id)
pacientesCtrl.getPaciente = async (req, res) => {
    try {
        const paciente = await Paciente.findById(req.pacienteID)
        //validando paciente no encontrado
        if (!paciente) {
            return res.status(404).send('Paciente no encontrado')
        }
        res.json(paciente);
    } catch (e) {
        res.status(204).send(); //Paciente no encontrado
    }
};


//Actualizar datos del paciente
pacientesCtrl.updatePaciente = async (req, res) => {
    var password = req.body.password
    const { rut, nombres, apellidos, fecha_nacimiento, ubicacion, centroMedico, telefono, correo } = req.body;
    const paciente_id = req.params.id_paciente

    //Validacion simple
    if (!rut || !password || !nombres || !apellidos || !fecha_nacimiento || !ubicacion || !ubicacion) {
        return res.json({
            message: 'Datos faltantes'
        });
    };

    if (paciente_id != req.pacienteID) {
        return res.status(500).json({
            auth: false,
            message: 'No tienes permisos para acceder a esta ruta'
        });
    }

    //BCRYPT: rehash de nueva contraseña
    await bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            password = hash;
            await Paciente.findByIdAndUpdate(paciente_id, {
                rut,
                password,
                nombres,
                apellidos,
                fecha_nacimiento,
                ubicacion,
                centroMedico,
                telefono,
                correo
            }, { new: true }, (err, pacienteUpdate) => {
                if (err) return res.status(500).send({ message: 'Request Error' });

                if (!pacienteUpdate) return res.status(404).send({ message: 'No se pudo actualizar paciente' })

                return res.status(200).json({
                    message: 'Centro medico modificado',
                    pacienteUpdate
                });
            });
        })
    })
};

//Eliminar paciente
pacientesCtrl.deletePaciente = async (req, res) => {
    try {
        await Paciente.findByIdAndDelete(req.params.id_paciente);
        res.json({ message: 'Paciente Eliminado' });
    } catch (e) {
        res.status(404).send()
    }
};

module.exports = pacientesCtrl;