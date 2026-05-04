import { useState, useMemo, useCallback } from 'react';
import { useNotes } from './context/NotesContext.jsx';
import NoteList from './components/NoteList.jsx';
import NoteForm from './components/NoteForm.jsx';
import SearchBar from './components/SearchBar.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';

const App = () => {
  const { notes, loading, error, addNote, editNote, removeNote } = useNotes();
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [query, setQuery] = useState('');
  const [filterBy, setFilterBy] = useState('category');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isDark, setIsDark] = useState(true);

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

  const handleToggleTheme = useCallback(() => {
  setIsDark(prev => {
    document.body.classList.toggle('light', prev);
    return !prev;
  }); 
}, []);

  return (
    <div>
      <h1>Mis notas</h1>
      <ThemeToggle isDark={isDark} onToggle={handleToggleTheme} />
      <SearchBar onSearch={setQuery} />
      <NoteForm onSubmit={handleSubmit} noteToEdit={noteToEdit} onCancel={handleCancel} />
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
  <p className="status-message">
    No existen notas con la categoría seleccionada.
  </p>
  )}
  {!error && filteredNotes.length > 0 && Object.entries(groupedNotes).map(([group, notes]) => (
  <div key={group}>
    <h2 className="category-title">{group}</h2>
    <NoteList
      notes={notes}
      onEdit={handleEdit}
      onDelete={removeNote}
      query={query}
    />
  </div>
  ))}
    </div>
  );
};

export default App;