import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true,
    },
    capacidad: {
      type: Number,
      required: [true, 'La capacidad es obligatoria'],
      min: [1, 'La capacidad mínima es 1'],
    },
    tipo: {
      type: String,
      enum: ['private', 'shared', 'meeting_room'],
      required: [true, 'El tipo es obligatorio'],
    },
    precioPorHora: {
      type: Number,
      required: [true, 'El precio por hora es obligatorio'],
      min: [0, 'El precio no puede ser negativo'],
    },
    activo: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model('Room', roomSchema);

export default Room;