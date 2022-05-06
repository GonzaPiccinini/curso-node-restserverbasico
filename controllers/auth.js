const { request, response } = require("express");

const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generate-jwt");
const Usuario = require('../models/usuario');
const { googleVerify } = require("../helpers/google-verify");

const login = async (req = request, res = response) => {
    const { email, password } = req.body;

    try {
        // Verificar si el correo existe
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({
                msg: 'El correo y/o al contraseña no son correctos - EMAIL'
            });
        }

        // Verificar si el usuario está activo
        if (usuario.state === false) {
            return res.status(400).json({
                msg: 'El correo y/o al contraseña no son correctos - STATE: FALSE'
            });
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'El correo y/o al contraseña no son correctos - PASSWORD'
            });
        }
        // Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Algo salió mal'
        });
    }
}

const googleSignIn = async (req, res = response) => {
    const { id_token } = req.body;

    try {

        const { name, img, email } = await googleVerify(id_token);
        
        let usuario = await Usuario.findOne({ email });

        if (!usuario) {
            // Tengo que crearlo
            const data = {
                name,
                email,
                password: ':P',
                img,
                google: true
            };

            usuario = new Usuario(data);
            await usuario.save();
        }

        // Estado del usuario
        if (!usuario.state) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            })
        }

        // Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'El TOKEN no se pudo verificar'
        })
    }

}

module.exports = {
    login,
    googleSignIn
}