import React from 'react';

const EventDetailsModal = ({ event, onClose }) => {
  return (
    <>
      {/* Overlay */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 999,
        }}
        onClick={onClose} // Cerrar el modal al hacer clic fuera
      />

      {/* Modal */}
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        zIndex: 1000,
      }}>
        <h2>{event.title}</h2>
        <p>Fecha: {event.start.toLocaleDateString()}</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </>
  );
};

export default EventDetailsModal;