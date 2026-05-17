import prisma from '../db/database.js'

export const getAllNotes = async (req, res) =>{
  try {
    const notes = await prisma.note.findMany();
    res.json(notes)
  } catch {
    res.status(500).json({ message: 'Error al obtener las notas.' });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const note = await prisma.note.findUnique({ 
      where: {id: Number(req.params.id)}});
    if (!note) return res.status(404).json({ message: 'Nota no encontrada.' });
    res.json(note);
  } catch {
    res.status(500).json({ message: 'Error al obtener la nota.'})
  };
};

export const createNote = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    if (!title || !content ) return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    const note = await prisma.note.create({
      data: { title, content, category }
    });
    res.status(201).json({ message: 'La nota se ha creado correctamente.' });
  } catch {
    res.status(500).json({ message: 'Error al crear la nota.' });
  };
};

export const updateNote = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const note = await prisma.note.update({
      where: { id: Number(req.params.id) },
      data: { title, content, category }
    });
    res.json(note);
  } catch {
    res.status(500).json({ message: 'Error al actualizar la nota.' });
  }
};

export const deleteNote = async (req, res) => {
  try {
    await prisma.note.delete({
      where: { id: Number(req.params.id) }
    });
    res.json({ message: 'Nota eliminada correctamente.' });
  } catch {
    res.status(500).json({ message: 'Error al eliminar la nota.' });
  }
};