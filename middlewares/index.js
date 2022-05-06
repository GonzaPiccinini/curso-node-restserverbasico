const inputValidation = require('../middlewares/input-validation');
const validateJWT = require('../middlewares/validate-jwt');
const validaRoles = require('../middlewares/validate-roles');

module.exports = {
    ...inputValidation,
    ...validateJWT,
    ...validaRoles
}