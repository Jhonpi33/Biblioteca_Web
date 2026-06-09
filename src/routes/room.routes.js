import { Router } from 'express';
import { check } from 'express-validator';
import {
    getAllRooms,
    getRoomById,
    createRoom,
    updateRoom,
    deleteRoom,
    getRoomAvailability,
} from '../controllers/room.controller.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';

const router = Router();

router.get('/', validarJWT, getAllRooms);
router.get('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos,
], getRoomById);

router.get('/:id/availability', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos,
], getRoomAvailability);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty().trim(),
    check('capacidad', 'La capacidad debe ser un número entero mayor a 0').isInt({ min: 1 }),
    check('tipo', 'El tipo no es válido').isIn(['private', 'shared', 'meeting_room']),
    check('precioPorHora', 'El precio debe ser un número mayor o igual a 0').isFloat({ min: 0 }),
    validarCampos,
], createRoom);

router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('capacidad', 'La capacidad debe ser un número entero mayor a 0').optional().isInt({ min: 1 }),
    check('tipo', 'El tipo no es válido').optional().isIn(['private', 'shared', 'meeting_room']),
    check('precioPorHora', 'El precio debe ser un número mayor o igual a 0').optional().isFloat({ min: 0 }),
    validarCampos,
], updateRoom);

router.delete('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos,
], deleteRoom);

export default router;