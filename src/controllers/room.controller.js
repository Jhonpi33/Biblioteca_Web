import Room from '../models/Room.js';
import Booking from '../models/Booking.js';

// Obtener todas las rooms
export const getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una room por ID
export const getRoomById = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
        return res.status(404).json({ message: 'Sala no encontrada' });
    }
        res.json(room);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear una room
export const createRoom = async (req, res) => {
    try {
        const room = new Room(req.body);
        await room.save();
        res.status(201).json(room);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar una room
export const updateRoom = async (req, res) => {
    try {
    const room = await Room.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );
    if (!room) {
    
            return res.status(404).json({ message: 'Sala no encontrada' });
    }
    res.json(room);
    } catch (error) {
            res.status(400).json({ message: error.message });
    }
};

// Eliminar una room
export const deleteRoom = async (req, res) => {
    try {
        const room = await Room.findByIdAndDelete(req.params.id);
            if (!room) {
        return res.status(404).json({ message: 'Sala no encontrada' });
    }
        res.json({ message: 'Sala eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
}
};

// DESAFÍO OPCIONAL: Disponibilidad de una room por fecha
export const getRoomAvailability = async (req, res) => {
    try {
    const { date } = req.query;
    if (!date) {
        return res.status(400).json({ message: 'Debes enviar una fecha con ?date=YYYY-MM-DD' });
    }

    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setUTCHours(23, 59, 59, 999);

    const bookings = await Booking.find({
        room: req.params.id,
        estado: 'confirmed',
        fechaInicio: { $lte: endOfDay },
        fechaFin: { $gte: startOfDay },
    });

    res.json({
        roomId: req.params.id,
        date,
        disponible: bookings.length === 0,
        reservasEseDia: bookings.length,
    });
    
} catch (error) {
    res.status(500).json({ message: error.message });
    }
};