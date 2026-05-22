const highlight = (text, query) => {
  if (!query) return text;
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase()
      ? <mark key={index}>{part}</mark>
      : part
  );
};

const NoteItem = ({ note, onEdit, onDelete, query }) => {
  return (
    <div className="note-item">
      <h3>{highlight(note.title, query)}</h3>
      <p>{highlight(note.content, query)}</p>
      {note.image && (
        <img
          src={`http://localhost:3001/uploads/${note.image}`}
          alt="imagen de la nota"
          className="note-image"
        />
      )}
      {note.category && <span>{note.category}</span>}
      <div className="note-item-footer">
        {note.createdAt && <small>{new Date(note.createdAt).toLocaleDateString()}</small>}
        <div className="note-item-actions">
          <button onClick={() => onEdit(note)}>Editar</button>
          <button className="btn-delete" onClick={() => onDelete(note.id)}>Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;