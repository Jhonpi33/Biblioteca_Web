import Booking from '../models/Booking.js';
import Room from '../models/Room.js';

export const getAllBookings = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.estado = req.query.status;
    if (req.query.roomId) filter.room = req.query.roomId;

    const bookings = await Booking.find(filter)
      .populate('member', 'nombre email plan')
      .populate('room', 'nombre tipo precioPorHora');

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('member', 'nombre email plan')
      .populate('room', 'nombre tipo precioPorHora');

    if (!booking) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBooking = async (req, res) => {
  try {
    const { member, room, fechaInicio, fechaFin, notas } = req.body;

    const roomData = await Room.findById(room);
    if (!roomData) {
      return res.status(404).json({ message: 'Sala no encontrada' });
    }

    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);

    if (fin <= inicio) {
      return res.status(400).json({ message: 'La fecha de fin debe ser mayor a la fecha de inicio' });
    }

    const horas = (fin - inicio) / (1000 * 60 * 60);
    const costoTotal = horas * roomData.precioPorHora;

    const solapamiento = await Booking.findOne({
      room,
      estado: 'confirmed',
      fechaInicio: { $lt: fin },
      fechaFin: { $gt: inicio },
    });

    if (solapamiento) {
      return res.status(400).json({
        message: 'La sala ya tiene una reserva confirmada en ese rango de fechas',
      });
    }

    const booking = new Booking({
      member,
      room,
      fechaInicio: inicio,
      fechaFin: fin,
      notas,
      costoTotal,
    });

    await booking.save();

    await booking.populate('member', 'nombre email plan');
    await booking.populate('room', 'nombre tipo precioPorHora');

    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { estado } = req.body;

    const estadosValidos = ['pending', 'confirmed', 'cancelled'];
    if (!estadosValidos.includes(estado)) {
      return res.status(400).json({
        message: `Estado inválido. Debe ser: ${estadosValidos.join(', ')}`,
      });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { estado },
      { new: true, runValidators: true }
    )
      .populate('member', 'nombre email plan')
      .populate('room', 'nombre tipo precioPorHora');

    if (!booking) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }

    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};