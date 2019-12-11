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
                                    ubicacion: paciente.ubicacion,
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
            await Paciente.findOneAndUpdate({ _id: req.params.id }, {
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
        });
    });
};

//Eliminar paciente
pacientesCtrl.deletePaciente = async (req, res) => {
    await Paciente.findByIdAndDelete(req.params.id);
    res.json({ message: 'Paciente Eliminado' });
};

module.exports = pacientesCtrl;