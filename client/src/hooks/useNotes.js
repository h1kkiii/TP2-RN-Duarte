import { useState, useEffect } from 'react';
import { getNotes, updateNote, deleteNote, createNote } from '../services/api.js';

const useNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


const fetchNotes = async () => {
  setLoading(true);
  try {
    const data = await getNotes();
    setNotes(data);
  } catch {
    setError('Error al cargar las notas, revise la conexión');
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchNotes();
}, []);

const addNote = async (note) => {
  try {
    const newNote = await createNote(note);
    setNotes([...notes, newNote]);
  } catch {
    setError('No hay conexión con el servidor.');
  }
};

const editNote = async (id, note) => {
  try {
    const updated = await updateNote(id, note);
    setNotes(notes.map(n => n.id === id ? updated : n));
  } catch {
    setError('Error al actualizar la nota');
  }
};

const removeNote = async (id) => {
  try {
    await deleteNote(id);
    setNotes(notes.filter(n => n.id !== id));
  } catch {
    setError('Error al eliminar la nota');
  }
};

return {notes, loading, error, addNote, editNote, removeNote};
};

export default useNotes;