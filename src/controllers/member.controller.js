import Member from '../models/Member.js';

// Obtener todos los members
export const getAllMembers = async (req, res) => {
  try {
    const members = await Member.find().select('-password');
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un member por ID
export const getMemberById = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id).select('-password');
    if (!member) {
      return res.status(404).json({ message: 'Miembro no encontrado' });
    }
    res.json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un member
export const createMember = async (req, res) => {
  try {
    const member = new Member(req.body);
    await member.save();
    res.status(201).json(member);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar un member
export const updateMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!member) {
      return res.status(404).json({ message: 'Miembro no encontrado' });
    }
    res.json(member);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un member
export const deleteMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Miembro no encontrado' });
    }
    res.json({ message: 'Miembro eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};