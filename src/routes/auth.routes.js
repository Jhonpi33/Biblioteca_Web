import { Router } from 'express';
import { check } from 'express-validator';
import { login, register } from '../controllers/auth.controller.js';
import { validarCampos } from '../middlewares/validar-campos.js';

const router = Router();

router.post('/login', [
    check('email', 'El email no es válido').isEmail().normalizeEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos,
], login);

router.post('/register', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty().trim(),
    check('email', 'El email no es válido').isEmail().normalizeEmail(),
    check('password', 'La contraseña debe tener mínimo 6 caracteres').isLength({ min: 6 }),
    check('plan', 'El plan no es válido').isIn(['basic', 'pro', 'enterprise']),
    validarCampos,
], register);

export default router;