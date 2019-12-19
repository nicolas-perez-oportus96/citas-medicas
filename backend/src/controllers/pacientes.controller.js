//Controller para route 'pacientes.js'
const Paciente = require('../models/Paciente');
const bcrypt = require('bcrypt');

const pacientesCtrl = {};

//FUNCIONES

//Consultar pacientes
pacientesCtrl.getPacientes = async (req, res) => {
    const pacientes = await Paciente.find();
    res.json(pacientes);
};

//Crear nuevo paciente (Register)
pacientesCtrl.registerPaciente = async (req, res) => {
    const { rut, password, nombres, apellidos, fecha_nacimiento, ubicacion, telefono, correo } = req.body;

    //Validacion simple
    if (!rut || !password || !nombres || !apellidos || !ubicacion || !fecha_nacimiento) {
        return res.json({
            message: 'Datos faltantes'
        });
    };

    //Verificando usuario existente
    await Paciente.findOne({ rut })
        .then(paciente => {
            if (paciente) return res.json({ message: 'Rut ya registrado' })

            const newPaciente = new Paciente({
                rut,
                password,
                nombres,
                apellidos,
                fecha_nacimiento,
                ubicacion,
                telefono,
                correo
            });

            //BCRYPT: generando Salt y Hash para password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newPaciente.password, salt, (err, hash) => {
                    if (err) throw err;
                    newPaciente.password = hash;
                    newPaciente.save()
                        .then(paciente => {
                            res.json({
                                paciente: {
                                    id: paciente.id,
                                    rut: paciente.rut,
                                    nombres: paciente.nombres,
                                    apellidos: paciente.apellidos,
                                    fecha_nacimiento: paciente.fecha_nacimiento,
                                    ubicacion: paciente.ubicacion,
                                    telefono: paciente.telefono,
                                    correo: paciente.correo
                                }
                            });
                        });
                });
            });
        });
};

//Consultar paciente (por id)
pacientesCtrl.getPaciente = async (req, res) => {
    try {
        const paciente = await Paciente.findById(req.params.id_paciente)
        res.json(paciente);
    } catch (e) {
        res.status(204).send(); //Paciente no encontrado
    }
};


//Actualizar datos del paciente
pacientesCtrl.updatePaciente = async (req, res) => {
    var password = req.body.password
    const { rut, nombres, apellidos, fecha_nacimiento, ubicacion, telefono, correo } = req.body;

    //Validacion simple
    if (!rut || !password || !nombres || !apellidos || !fecha_nacimiento || !ubicacion) {
        return res.json({
            message: 'Datos faltantes'
        });
    };

    // update it with hash
    await bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            password = hash;
            try {
                await Paciente.findOneAndUpdate({ _id: req.params.id_paciente }, {
                    rut,
                    password,
                    nombres,
                    apellidos,
                    fecha_nacimiento,
                    ubicacion,
                    telefono,
                    correo
                });
                res.json({ message: 'Paciente Modificado' });
            } catch (e) {
                res.status(404).send()
            }
        });
    });
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