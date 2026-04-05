import NoteItem from './NoteItem.jsx';

const NoteList = ({ notes, onEdit, onDelete, query }) => {
  if (notes.length === 0 && query) return <p className="status-message">No se encontraron notas que coincidan con "{query}".</p>;
  if (notes.length === 0) return <p className="status-message">No hay notas todavía.</p>;

  return (
    <div className="note-list">
      {notes.map((note, index) => (
        <NoteItem
          key={note.id || index}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
          query={query}
        />
      ))}
    </div>
  );
};

export default NoteList;
