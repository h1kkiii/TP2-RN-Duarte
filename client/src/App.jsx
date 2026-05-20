// src/App.jsx
import { useState, useMemo, useCallback } from 'react';
import { useNotes } from './context/NotesContext.jsx';
import NoteList from './components/NoteList.jsx';
import NoteForm from './components/NoteForm.jsx';
import SearchBar from './components/SearchBar.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';
import ConfirmModal from './components/ConfirmModal.jsx';
import EditModal from './components/EditModal.jsx';

const App = () => {
  const { notes, loading, error, addNote, editNote, removeNote } = useNotes();
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [query, setQuery] = useState('');
  const [filterBy, setFilterBy] = useState('category');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isDark, setIsDark] = useState(true);

const handleToggleTheme = useCallback(() => {
  setIsDark(prev => {
    if (prev) {
      document.body.classList.add('light');
    } else {
      document.body.classList.remove('light');
    }
    return !prev;
  });
}, []);

  const handleEdit = useCallback((note) => {
    setNoteToEdit(note);
  }, []);

  const handleDeleteClick = useCallback((id) => {
    setNoteToDelete(id);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    removeNote(noteToDelete);
    setNoteToDelete(null);
  }, [noteToDelete, removeNote]);

  const handleCancelDelete = useCallback(() => {
    setNoteToDelete(null);
  }, []);

  const handleSubmitEdit = useCallback((note) => {
    editNote(noteToEdit.id, note);
    setNoteToEdit(null);
  }, [noteToEdit, editNote]);

  const handleCancelEdit = useCallback(() => {
    setNoteToEdit(null);
  }, []);

  const handleSubmit = (note) => {
    addNote(note);
  };

  const filteredNotes = useMemo(() =>
    notes.filter(note => {
      const matchesQuery =
        (note.title || '').toLowerCase().includes(query.toLowerCase()) ||
        (note.content || '').toLowerCase().includes(query.toLowerCase());
      const matchesCategory = selectedCategory
        ? selectedCategory === 'sin-categoria'
          ? !note.category
          : note.category === selectedCategory
        : true;
      return matchesQuery && matchesCategory;
    }),
  [notes, query, selectedCategory]);

  const groupedNotes = useMemo(() => {
    if (filterBy === 'category') {
      return filteredNotes.reduce((groups, note) => {
        const category = note.category || 'Sin categoría';
        if (!groups[category]) groups[category] = [];
        groups[category].push(note);
        return groups;
      }, {});
    } else {
      return filteredNotes.reduce((groups, note) => {
        const date = new Date(note.createdAt).toLocaleDateString();
        if (!groups[date]) groups[date] = [];
        groups[date].push(note);
        return groups;
      }, {});
    }
  }, [filteredNotes, filterBy]);

  return (
    <div>
      <h1>Mis notas</h1>
      <ThemeToggle isDark={isDark} onToggle={handleToggleTheme} />
      <SearchBar onSearch={setQuery} />
      <button className="btn-new-note" onClick={() => setShowForm(prev => !prev)}>
      {showForm ? '✕ Cancelar' : '+ Nueva nota'}
      </button>
      {showForm && <NoteForm onSubmit={handleSubmit} />}
      {loading && <p className="status-message">Cargando...</p>}
      {error && <p className="error-message">{error}</p>}
      <div className="filter-bar">
        <span>Filtrar por:</span>
        <select value={filterBy} onChange={(e) => { setFilterBy(e.target.value); setSelectedCategory(''); }}>
          <option value="category">Categoría</option>
          <option value="date">Fecha</option>
        </select>
        {filterBy === 'category' && (
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">Todas</option>
            <option value="Personal">Personal</option>
            <option value="Trabajo">Trabajo</option>
            <option value="Estudio">Estudio</option>
            <option value="Ideas">Ideas</option>
            <option value="Otro">Otro</option>
            <option value="sin-categoria">Sin categoría</option>
          </select>
        )}
      </div>
      {!error && filteredNotes.length === 0 && !loading && (
        <p className="status-message">No existen notas con la categoría seleccionada.</p>
      )}
      {!error && filteredNotes.length > 0 && Object.entries(groupedNotes).map(([group, notes]) => (
        <div key={group}>
          <h2 className="category-title">{group}</h2>
          <NoteList
            notes={notes}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
            query={query}
          />
        </div>
      ))}
      {noteToDelete && (
        <ConfirmModal
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
      {noteToEdit && (
        <EditModal
          noteToEdit={noteToEdit}
          onSubmit={handleSubmitEdit}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
};

export default App;