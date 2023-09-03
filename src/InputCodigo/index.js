import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Add this line
import Modal from 'react-modal';
import museolili from './resources/museolili.png';
import './inputCodigo.css';
import { ModalHelp } from '../Modal';
import { EnviandoCarga } from '../EnviandoCarga';
import { ErrorCarga } from '../ErrorCarga';
import { SentInformacion } from '../SentInformacion';

function InputCodigo() {
  const [inputValue, setInputValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    identification: '',
    email: '',
    acceptTerms: false,
    student: false,
    visitor: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorOccurred, setErrorOccurred] = useState(false);
  const [sentInformation, setSentInformation] = useState(false);

  const closeErrorModal = () => {
    setErrorOccurred(false);
  };
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    // Validar la cadena ingresada
    if (value.length === 4 && value.toUpperCase() === 'ASDW') {
      setShowModal(true);
    }
  };

  const handleModalInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === 'checkbox' ? checked : value;
    setUserData({ ...userData, [name]: inputValue });
  };

  const handleAcceptTerms = () => {
    setUserData({ ...userData, acceptTerms: !userData.acceptTerms });
  };

  const openRegistrationModal = () => {
    setShowModal(true);
  };

  const handleEnviarClick = () => {
    // Realiza cualquier lógica de envío de datos aquí
    setIsLoading(true);
  
    // Simular una demora en la conexión con el servidor (5 segundos)
    setTimeout(() => {
      // Simular un error (puedes cambiar esta lógica según tus necesidades)
      const hasError = false; // Cambiar a 'true' para simular un error
  
      if (hasError) {
        console.log(errorOccurred);
        setErrorOccurred(true);
        setIsLoading(false);
      } else {
        // Si no hay error, mostrar el modal de SentInformacion durante 2 segundos
        setSentInformation(true);
        setIsLoading(false);
  
        setTimeout(() => {
          setSentInformation(false);
          setShowModal(false);
          // Redirigir a la ruta "/introduccion" después de mostrar el modal
          navigate('/introduccion');
        }, 2000); // 2000 ms = 2 segundos
      }
    }, 3000); // 5000 ms = 5 segundos
  };

  const areFieldsComplete = () => {
    return (
      userData.identification !== '' &&
      userData.acceptTerms === true
    );
  };

  const buttonClass = areFieldsComplete() ? 'btnContinuarUnblock' : 'btnContinuarBlock';

  useEffect(() => {
    // Aquí puedes agregar efectos secundarios cuando cambie el estado de isLoading o errorOccurred
  }, [isLoading, errorOccurred]);

  return (
    <>
      <div className='cont_inicio'>
        <ModalHelp />
        <h1 className='black'>Bienvenidos al museo interactivo lili</h1>
        <label className='parrafos'>Introduce el código para iniciar la experiencia</label>
        <input
          className='input_yellow'
          value={inputValue}
          onChange={handleInputChange}
          maxLength={4} // Limitar la entrada a 4 caracteres
        />
        <img src={museolili} alt="Logo del museo lili" />

        {/* Modal para el registro de datos */}
        {isLoading ? (
          <EnviandoCarga />
        ) : errorOccurred ? (
          <ErrorCarga onClose={closeErrorModal} />
        ) : sentInformation ? (
          <SentInformacion />
        ) : (
          <Modal
            className="modalinput"
            isOpen={showModal}
            onRequestClose={() => setShowModal(false)}
            contentLabel="Registro de Datos"
          >
            <h2 className='modaltitulo'>Registro</h2>

            <input className='inputRegistro' placeholder='Nombre:' type="text" name="name" value={userData.name} onChange={handleModalInputChange} />
            <input className='inputRegistro' placeholder='Documento de Identidad:' type="number" name="identification" value={userData.identification} onChange={handleModalInputChange} />
            <input className='inputRegistro' placeholder='Correo:' type="email" name="email" value={userData.email} onChange={handleModalInputChange} />

            <label className='txtTerminos'>
              <input
                className='mycheck'
                type="checkbox"
                name="acceptTerms"
                checked={userData.acceptTerms}
                onChange={handleAcceptTerms}
              />
              Estoy de acuerdo con los términos y condiciones
            </label>
            <div className='rolCheckbox'>
              <label className='txtRol'>
                Estudiante:
                <input
                  className='mycheckRol'
                  type="checkbox"
                  name="student"
                  checked={userData.acceptTerms}
                  onChange={handleAcceptTerms}
                />
              </label>
              <label className='txtRol'>
                Visitante:
                <input
                  className='mycheckRol'
                  type="checkbox"
                  name="visitor"
                  checked={userData.acceptTerms}
                  onChange={handleAcceptTerms}
                />
              </label>
            </div>

            <button className={buttonClass} onClick={handleEnviarClick} disabled={!areFieldsComplete()}>
              Enviar
            </button>
          </Modal>
        )}
      </div>
    </>
  );
}

export { InputCodigo };
