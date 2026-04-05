import Note from "../models/Note.js";

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.findAll();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las notas'});
  }
};

export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Nota no encontrada'});
    }res.json(note);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la nota'});
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    if (!title || !content) return res.status(400).json({ message: 'Título y contenido son obligatorios'});
    const note = await Note.create({ title, content, category});
    res.status(201).json(note);
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear la nota'});
  }
};

export const updateNote = async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    if (!note) return res.status(404).json({ message: 'Nota no encontrada'});
    const { title, content, category} = req.body;
    await note.update({title, content, category});
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la nota'});
  }
};

export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    console.log('nota encontrada:', note);
    if (!note) return res.status(404).json({ message: 'Nota no encontrada'});
    await note.destroy();
    res.json({ message: 'Nota eliminada correctamente'});
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error al eliminar nota'});
  }
};