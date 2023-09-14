import React from 'react';
import './SentInformacion.css';
import sent from './sent.png';

function SentInformacion() {
      

        return (
          <div className="modalinput">
            <h2 className='modaltitulo'>Enviado</h2>
            
            <img src={sent} alt="Logo de enviado" />
            <p className='font-p'>La información se envió correctamente</p>
          </div>
        );
      };
      
      export { SentInformacion };
      