const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {
    console.log('middleware');
    const authHeader = req.headers.authorization;

    // Verificando se token existe
    if (!authHeader) {
        return res.status(401).json({
            error: true,
            message: 'Token não fornecido'
        });
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2) {
        return res.status(401).json({
            error: true,
            message: 'Tipo de token inválido'
        });
    }

    // Desestruturando array
    const [scheme, token] = parts;
    
    // Verificar de palavra existe
    if (scheme.indexOf('Bearer') !== 0) {
        return res.status(401).json({
            error: true,
            message: 'Formato de token inválido'
        });
    }

    // Verificando se token é válido
    jwt.verify(token, authConfig.secret, (err, decoded) => {

        console.log(err);
        console.log(decoded);
        
        if (err) {
            return res.status(401).json({
                error: true,
                message: 'Token inválido ou expirado'
            });
        }

        req.userLogged = decoded;

        return next();
    })
}