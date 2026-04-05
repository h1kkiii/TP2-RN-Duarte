import { useState, useEffect } from 'react';

const NoteForm =({ onSubmit, noteToEdit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
      setCategory(noteToEdit.category);
    } else {
      setTitle('');
      setContent('');
      setCategory('');
    }
  }, [noteToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content, category });
    setTitle('');
    setContent('');
    setCategory('');
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
    <input
      type="text"
      placeholder="Título"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      required
    />
    <textarea
      placeholder="Contenido"
      value={content}
      onChange={(e) => setContent(e.target.value)}
      required
    />
    <div className="note-form-row">
  <input
    type="text"
    placeholder="Categoría (opcional)"
    value={category}
    onChange={(e) => setCategory(e.target.value)}
  />
  {noteToEdit && (
    <button type="button" className="btn-cancel" onClick={onCancel}>
      Cancelar
    </button>
  )}
  <button type="submit">
    {noteToEdit ? 'Actualizar' : 'Crear'} nota
  </button>
</div>
  </form>
  );
};

export default NoteForm;