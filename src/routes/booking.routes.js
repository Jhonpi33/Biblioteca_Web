import { Router } from 'express';
import { check } from 'express-validator';
import {
    getAllBookings,
    getBookingById,
    createBooking,
    updateBookingStatus,
} from '../controllers/booking.controller.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';

const router = Router();

router.get('/', validarJWT, getAllBookings);
router.get('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos,
], getBookingById);

router.post('/', [
    validarJWT,
    check('member', 'El member debe ser un ID válido de MongoDB').isMongoId(),
    check('room', 'El room debe ser un ID válido de MongoDB').isMongoId(),
    check('fechaInicio', 'La fecha de inicio es obligatoria y debe ser formato ISO').isISO8601().toDate(),
    check('fechaFin', 'La fecha de fin es obligatoria y debe ser formato ISO').isISO8601().toDate(),
    validarCampos,
], createBooking);

router.patch('/:id/status', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('estado', 'El estado no es válido').isIn(['pending', 'confirmed', 'cancelled']),
    validarCampos,
], updateBookingStatus);

export default router;