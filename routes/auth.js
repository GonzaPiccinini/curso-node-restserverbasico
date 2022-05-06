const { Router } = require('express');
const { validarCampos } = require('../middlewares/input-validation');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');

const router = Router();

router.post('/login', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatorio').not().isEmpty(),
    validarCampos
], login);

router.post('/google', [
    check('id_token', 'ID_TOKEN es necesario').not().isEmpty(),
    validarCampos
], googleSignIn);

module.exports = router;