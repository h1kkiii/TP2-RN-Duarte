import { useState } from 'react';
import useNotes from './hooks/useNotes.js';
import NoteList from './components/NoteList.jsx';
import NoteForm from './components/NoteForm.jsx';
import SearchBar from './components/SearchBar.jsx';

const App = () => {
  const { notes, loading, error, addNote, editNote, removeNote } = useNotes();
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [query, setQuery] = useState('');

  const handleSubmit = (note) => {
    if (noteToEdit) {
      editNote(noteToEdit.id, note);
      setNoteToEdit(null);
    } else {
      addNote(note);
    }
  };

  const handleEdit = (note) => {
    setNoteToEdit(note);
  };

  const handleCancel = () => {
  setNoteToEdit(null);
};

const filteredNotes = notes.filter(note =>
  (note.title || '').toLowerCase().includes(query.toLowerCase()) ||
  (note.content || '').toLowerCase().includes(query.toLowerCase())
);

  return (
    <div>
      <h1>Mis notas</h1>
      <SearchBar onSearch={setQuery} />
      <NoteForm onSubmit={handleSubmit} noteToEdit={noteToEdit} onCancel={handleCancel} />
      {loading && <p className="status-message">Cargando...</p>}
      {error && <p className="error-message">{error}</p>}
      {!error && (
        <NoteList
        notes={filteredNotes}
        onEdit={handleEdit}
        onDelete={removeNote}
        query={query}
  />
)}
    </div>
  );
};

export default App;