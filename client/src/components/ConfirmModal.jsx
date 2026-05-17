import { memo } from 'react';

const ConfirmModal = memo(({ onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <p>¿Estás seguro que querés eliminar esta nota?</p>
        <div className="modal-actions">
          <button className="btn-delete" onClick={onConfirm}>Eliminar</button>
          <button onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
});

export default ConfirmModal;