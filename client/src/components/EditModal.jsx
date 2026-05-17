import { memo } from 'react';
import NoteForm from './NoteForm.jsx';

const EditModal = memo(({ noteToEdit, onSubmit, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Editar nota</h2>
        <NoteForm
          onSubmit={onSubmit}
          noteToEdit={noteToEdit}
          onCancel={onCancel}
        />
      </div>
    </div>
  );
});

export default EditModal;