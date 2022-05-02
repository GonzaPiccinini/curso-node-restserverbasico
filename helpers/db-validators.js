const Role = require('../models/role')
const Usuario = require('../models/usuario');

const isValidRole = async (role = '') => {
    const existeRol = await Role.findOne({ role });
    if (!existeRol) {
        throw new Error(`El rol ${role} no esta registrado en la base de datos`);
    };
};

const isEmailRepeat = async (email = '') => {
    const emailRepeat = await Usuario.findOne({ email });
    if (emailRepeat) {
        throw new Error(`El correo ${email} ya esta registrado`);
    };
};

const idUser = async (id) => {
    const idExist = await Usuario.findById(id);
    if (!idExist) {
        throw new Error(`El ID ${id} no existe`);
    };
};

module.exports = {
    isValidRole,
    isEmailRepeat,
    idUser
}