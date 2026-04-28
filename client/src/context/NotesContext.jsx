import { createContext, useContext, useEffect, useReducer } from 'react'
import { getNotes, createNote, updateNote, deleteNote } from '../services/api.js'

const NotesContext = createContext();

const initialState = {
  notes: [],
  loading: false,
  error: null,
};

const notesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR' :
      return { ...state, error: action.payload };
    case 'SET_NOTES' :
      return { ...state, notes: action.payload };
    case 'ADD_NOTE' :
      return { ...state, notes: [...state.notes, action.payload] };
    case 'EDIT_NOTE' :
      return {
        ...state,
        notes: state.notes.map(n => n.id === action.payload.id ? action.payload : n)
      };
    case 'DELETE_NOTE' :
      return {
        ...state,
        notes: state.notes.filter(n => n.id !== action.payload)
      };
    default:
      return state;
  }
};

export const NotesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notesReducer, initialState);

  useEffect(() => {
    const fetchNotes = async () => {
      dispatch({ type: 'SET_LOADING', payload:true });
      try {
        const data = await getNotes();
        dispatch({ type: 'SET_NOTES', payload: data});
      } catch {
        dispatch({ type: 'SET_ERROR', payload: 'Error al cargar las notas, revisar conexión.' });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };
    fetchNotes();
  }, []);

  const addNote = async (note) => {
    try {
      const newNote = await createNote(note);
      dispatch({ type: 'ADD_NOTE', payload: newNote });
    } catch {
      dispatch({ type: 'SET_ERROR', payload: 'No hay conexión con el servidor.' });
    }
  };

  const editNote = async (id, note) => {
    try {
      const updated = await updateNote(id, note);
      dispatch({ type: 'EDIT_NOTE', payload: updated });
    } catch {
      dispatch({ type: 'SET_ERROR', payload: 'Error al actualizar la nota.' });
    }
  };

  const removeNote = async (id) => {
    try {
      await deleteNote(id);
      dispatch({ type: 'DELETE_NOTE', payload: id });
    } catch {
      dispatch({ type: 'SET_ERROR', payload: 'Error al eliminar nota.' });
    }
  };

  return (
  <NotesContext.Provider value={{ ...state, addNote, editNote, removeNote }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);