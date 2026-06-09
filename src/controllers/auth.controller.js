import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Member from '../models/Member.js';

export const login = async (req, res) => {
    const { email, password } = req.body;

try {
    const member = await Member.findOne({ email });
    if (!member) {
        return res.status(400).json({ message: 'Email o contraseña incorrectos' });
    }

    if (!member.activo) {
        return res.status(400).json({ message: 'Usuario inactivo' });
    }

    const validPassword = bcrypt.compareSync(password, member.password);
    if (!validPassword) {
        return res.status(400).json({ message: 'Email o contraseña incorrectos' });
    }

    const token = jwt.sign(
    { uid: member._id },
        process.env.JWT_SECRET,
            { expiresIn: '24h' }
    );

    res.json({
        member: {
        _id: member._id,
        nombre: member.nombre,
        email: member.email,
        plan: member.plan,
    },
        token,
        });
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
};

export const register = async (req, res) => {
    const { nombre, email, password, plan } = req.body;

try {
    const existeEmail = await Member.findOne({ email });
    if (existeEmail) {
        return res.status(400).json({ message: 'El email ya está registrado' });
    }

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    const member = new Member({
        nombre,
        email,
        password: passwordHash,
        plan,
    });

    await member.save();

    const token = jwt.sign(
    { uid: member._id },
        process.env.JWT_SECRET,
            { expiresIn: '24h' }
    );

    res.status(201).json({
        member: {
        _id: member._id,
        nombre: member.nombre,
        email: member.email,
        plan: member.plan,
    },
    token,
    });
} catch (error) {
    res.status(500).json({ message: error.message });
}
};