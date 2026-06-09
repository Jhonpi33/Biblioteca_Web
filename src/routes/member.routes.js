import { Router } from 'express';
import { check } from 'express-validator';
import {
    getAllMembers,
    getMemberById,
    createMember,
    updateMember,
    deleteMember,
} from '../controllers/member.controller.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';

const router = Router();

router.get('/', validarJWT, getAllMembers);
router.get('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos,
], getMemberById);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty().trim(),
    check('email', 'El email no es válido').isEmail().normalizeEmail(),
    check('password', 'La contraseña debe tener mínimo 6 caracteres').isLength({ min: 6 }),
    check('plan', 'El plan no es válido').isIn(['basic', 'pro', 'enterprise']),
    validarCampos,
], createMember);

router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('email', 'El email no es válido').optional().isEmail().normalizeEmail(),
    check('plan', 'El plan no es válido').optional().isIn(['basic', 'pro', 'enterprise']),
    validarCampos,
], updateMember);

router.delete('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos,
], deleteMember);

export default router;