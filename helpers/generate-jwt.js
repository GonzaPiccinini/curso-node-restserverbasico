const jwt = require('jsonwebtoken');

const generarJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign(payload, process.env.SECRET_PRIVATE_KEY, {
            expiresIn: '4h'
        }, (error, token) => {
            if (error) {
                reject('No se pudo generar el token');
            } else {
                resolve(token);
            }
        })
    })
};

module.exports = {
    generarJWT
}