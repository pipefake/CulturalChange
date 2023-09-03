import React from 'react';
import './ErrorCarga.css';

function ErrorCarga({ onClose }) {
      
    const handleCerrarErrorClick = () => {
        onClose(); // Cierra el modal de error
      };
      
  return (
    <div className="modalinput">
      <h2 className='modaltitulo'>Error</h2>
      <p>Verifique la información diligenciada</p>
      <h1 className='imagenpruebaX'>X</h1>
      {/* Agrega detalles sobre el error si lo deseas */}
      <button onClick={handleCerrarErrorClick}>Cerrar Error</button>
    </div>
  );
};

export { ErrorCarga };
