import { useState, useEffect } from 'react';

const NoteForm =({ onSubmit, noteToEdit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
      setCategory(noteToEdit.category);
      setImage(null);
    } else {
      setTitle('');
      setContent('');
      setCategory('');
      setImage(null);
    }
  }, [noteToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('category', category);
    if (image) formData.append('image', image);
    onSubmit(formData);
    setTitle('');
    setContent('');
    setCategory('');
    setImage(null);
  };

return (
  <form className="note-form" onSubmit={handleSubmit}>
      <label>
        Título
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label>
        Contenido
        <textarea
          placeholder="Contenido"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </label>
      <label>
        Imagen (opcional)
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </label>
      <div className="note-form-row">
        <label>
          Categoría
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Sin categoría</option>
            <option value="Personal">Personal</option>
            <option value="Trabajo">Trabajo</option>
            <option value="Estudio">Estudio</option>
            <option value="Ideas">Ideas</option>
            <option value="Otro">Otro</option>
          </select>
        </label>
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