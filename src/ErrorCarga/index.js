import React from 'react';
import './ErrorCarga.css';
import error from './error.png';

function ErrorCarga({ onClose }) {
      
    const handleCerrarErrorClick = () => {
        onClose(); // Cierra el modal de error
      };
      
  return (
    <div className="modalinput">
      <h2 className='modaltitulo'>Error</h2>
      <img src={error} alt="Logo de error" />
            
      <p className='font-p'>Verifique la información diligenciada</p>
      
      {/* Agrega detalles sobre el error si lo deseas */}
      <button className='btnContinuar' onClick={handleCerrarErrorClick}>Cerrar</button>
    </div>
  );
};

export { ErrorCarga };
