const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarJWT, isAdmin, tieneRole } = require('../middlewares');

const { isValidRole, isEmailRepeat, idUser } = require('../helpers/db-validators');

const { usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete } = require('../controllers/user');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
    // Toma el id del parametro de la url
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(idUser),
    check('role').custom(isValidRole),
    validarCampos
], usuariosPut);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe de ser mas de 6 letras').isLength({
        min: 6,
    }),
    check('email', 'El correo no es valido').isEmail(),
    check('email').custom(isEmailRepeat),
    // check('role', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(isValidRole),
    validarCampos
], usuariosPost);

router.delete('/:id', [
    validarJWT,
    // isAdmin,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(idUser),
    validarCampos
], usuariosDelete);

module.exports = router;