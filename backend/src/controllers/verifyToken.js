//funcion para proteger routes
const jwt = require('jsonwebtoken')

function verifyToken(req, res, next) {
    //verificando token en headers
    const token = req.headers['x-access-token']
        //decodificando token
    if (!token) {
        //Si no hay token...
        return res.status(401).json({
            auth: false,
            message: "Iniciar sesion para continuar"
        });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.centroID = decoded.id
    next();
}

module.exports = verifyToken;