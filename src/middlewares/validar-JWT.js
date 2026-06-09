import jwt from 'jsonwebtoken';
import Member from '../models/Member.js';

export const validarJWT = async (req, res, next) => {
    const token = req.header('Jhonpi-Token');

    if (!token) {
    return res.status(401).json({ message: 'No hay token en la petición' });
    }

    try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    const member = await Member.findById(uid);

    if (!member) {
    return res.status(401).json({ message: 'Token no válido - usuario no existe' });
    }

    if (!member.activo) {
    return res.status(401).json({ message: 'Token no válido - usuario inactivo' });
    }

    req.member = member;
    next();
    } catch (error) {
    res.status(401).json({ message: 'Token no válido' });
    }
};
