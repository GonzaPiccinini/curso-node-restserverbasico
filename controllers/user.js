const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosGet = async (req = request, res = response) => {
    const { limite = 5, min = 0 } = req.query;
    const queryFilter = { state: true };

    // const usuarios = await Usuario.find(queryFilter)
    //     .skip(Number(min))
    //     .limit(Number(limite));

    // const total = await Usuario.countDocuments(queryFilter);

    // Mejoramos el rendimiento(velocidad) de respuesta
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(queryFilter),
        Usuario.find(queryFilter)
            .skip(Number(min))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    });
};


const usuariosPut = async (req, res = response) => {
    const id = req.params.id;
    const { _id, password, google, correo, ...resto } = req.body;

    // TODO: validar contra base de datos
    if (password) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
};


const usuariosPost = async (req = request, res = response) => {
    const { name, email, password, role } = req.body;
    const usuario = new Usuario({ name, email, password, role });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en DB
    await usuario.save();

    res.json({
        usuario
    });
};


const usuariosDelete = async (req, res = response) => {
    const id = req.params.id;  
    const queryFilter = { state: false }

    // Lo borramos físicamente
    // const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, queryFilter)

    res.json({
        usuario,
    });
};

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}