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
pacientesCtrl.createPaciente = async (req, res) => {
    const { rut, password, nombres, apellidos, fecha_nacimiento, telefono, correo } = req.body;

    //Validacion simple
    if (!rut || !password || !nombres || !apellidos || !fecha_nacimiento) {
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
                telefono,
                correo
            });

            //generando Salt y Hash para password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newPaciente.password, salt, (err, hash) => {
                    if (err) throw err;
                    newPaciente.password = hash;
                    newPaciente.save()
                        .then(paciente => {
                            res.json({
                                paciente: {
                                    id: paciente.id,
                                    nombres: paciente.nombres,
                                    apellidos: paciente.apellidos,
                                    fecha_nacimiento: paciente.fecha_nacimiento,
                                    telefono: paciente.telefono,
                                    correo: paciente.correo
                                }
                            });
                        });
                })
            })
        })
};

//Consultar paciente (por id)
pacientesCtrl.getPaciente = async (req, res) => {
    const paciente = await Paciente.findById(req.params.id);
    res.json(paciente);
};


//Actualizar datos del paciente (pendiente re-hash de password)
pacientesCtrl.updatePaciente = async (req, res) => {
    const { rut, password, nombres, apellidos, fecha_nacimiento, telefono, correo } = req.body;

    //Validacion simple
    if (!rut || !password || !nombres || !apellidos || !fecha_nacimiento) {
        return res.json({
            message: 'Datos faltantes'
        });
    };

    await Paciente.findOneAndUpdate({ _id: req.params.id }, {
        rut,
        password,
        nombres,
        apellidos,
        fecha_nacimiento,
        telefono,
        correo
    });
    res.json({ message: 'Paciente Modificado' });
};

//Eliminar paciente
pacientesCtrl.deletePaciente = async (req, res) => {
    await Paciente.findByIdAndDelete(req.params.id);
    res.json({ message: 'Paciente Eliminado' });
};

module.exports = pacientesCtrl;