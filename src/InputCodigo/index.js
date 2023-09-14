import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import museolili from './resources/museolili.png';
import './inputCodigo.css';
import { BtnContinuar } from '../BtnContinuar';
import { ModalHelp } from '../Modal';
// import { useAuth } from '../auth';
import { EnviandoCarga } from '../EnviandoCarga';
import { ErrorCarga } from '../ErrorCarga';
import { SentInformacion } from '../SentInformacion';

function InputCodigo() {

  // const auth = useAuth();
  const [username, setUsername] = React.useState('');

  const [inputValue, setInputValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formComplete, setFormComplete] = useState(false); // Nuevo estado

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

  const navigate = useNavigate();

  const closeErrorModal = () => {
    setErrorOccurred(false);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    // Validar la cadena ingresada
    if (value.length === 4 && value.toUpperCase() === 'ASDW') {
      setShowModal(true);
    }

    // Comprobar si los campos requeridos están completos
    updateFormComplete();
  };

  const handleModalInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === 'checkbox' ? checked : value;
    if (name === 'student' && checked) {
      setUserData({ ...userData, student: true, visitor: false });
    } else if (name === 'visitor' && checked) {
      setUserData({ ...userData, visitor: true, student: false });
    } else {
      setUserData({ ...userData, [name]: inputValue });
    }
    updateFormComplete();
  };

  const handleAcceptTerms = () => {
    setUserData({ ...userData, acceptTerms: !userData.acceptTerms });
  };

  // Función para comprobar si los campos requeridos están completos
  const updateFormComplete = () => {
    const { name, email } = userData;
    const isComplete = name && email && inputValue.length === 4 && inputValue.toUpperCase() === 'ASDW';
    setFormComplete(isComplete);
  };

  const openRegistrationModal = () => {
    setShowModal(true);
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    try {
      // Realizar validaciones adicionales aquí
      if (!userData.name) {
        throw new Error("El campo Nombre es obligatorio.");
      }
      if (!userData.identification) {
        throw new Error("El campo Documento de Identidad es obligatorio.");
      }
      if (!userData.email) {
        throw  new Error("El campo Correo es obligatorio.");
      }
      if (!userData.acceptTerms) {
        throw new Error("Debes aceptar los términos y condiciones.");
      }
      if (!userData.student && !userData.visitor) {
        throw new Error("Debes seleccionar al menos una opción entre Estudiante y Visitante.");
      }
      if (userData.student && userData.visitor) {
        throw new Error("No puedes seleccionar ambas opciones al mismo tiempo.");
      }
  
      // Construir el objeto JSON a enviar
      const requestBody = {
        nombre: userData.name,
        identificacion: userData.identification,
        correo: userData.email,
        rol: "huaquero" // Rol por defecto
      };
  
      // Realizar la solicitud POST al servidor
      const response = await fetch('https://localhost:3500/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      // Verificar la respuesta del servidor
      if (!response.ok) {
        setErrorEnviandoFormulario(true); // Establecer errorEnviandoFormulario en true
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      } else {
        // Si la respuesta es exitosa, establecer errorEnviandoFormulario en false
        setErrorEnviandoFormulario(false);
      }
  
      // Si todas las validaciones pasan y la solicitud es exitosa, puedes realizar alguna acción
      console.log('Datos enviados correctamente.');
  
      // Redirigir a la ruta "/introduccion"
      navigate('/introduccion');
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  };
  


  const [errorEmail, setErrorEmail] = useState('');

  const handleEmailInputChange = (event) => {
    const { name, value, type, checked } = event.target;
  
    // Verifica si el valor no está vacío antes de validar el formato del correo electrónico
    if (value === '') {
      setErrorEmail(''); // Limpia el mensaje de error si el campo está vacío
    } else {
      // Valida que el valor sea una dirección de correo electrónico válida utilizando una expresión regular
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  
      if (!emailRegex.test(value)) {
        setErrorEmail('El correo debe contener @ y .com.');
      } else {
        // El valor del correo electrónico es válido
        setErrorEmail('');
      }
    }
  
    // Actualiza el estado con el valor ingresado
    setUserData({ ...userData, [name]: value });
  
    // Comprueba si los campos requeridos están completos
    updateFormComplete();
  };
  
  


  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleNameChange = (event) => {
    const { name, value, type, checked } = event.target;

    // Validar que solo se ingresen letras y espacios
    const regex = /^[a-zA-Z\s]*$/;

    if (!regex.test(value)) {
      setError('El nombre solo debe contener letras y espacios.');
    } else if (value.length > 30) {
      setError('El nombre no puede tener más de 30 caracteres.');
    } else {
      setError('');
    }

    const inputValue = type === 'checkbox' ? checked : value;
    setUserData({ ...userData, [name]: inputValue });

    // Comprobar si los campos requeridos están completos
    updateFormComplete();
  };

  const [errorIdentification, setErrorIdentification] = useState('');
  const [errorEnviandoFormulario, setErrorEnviandoFormulario] = useState(false);

  const handleIdentificationInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (value === '') {
      setErrorIdentification('');
    } else {
      const floatValue = parseFloat(value);
      const intValue = parseInt(value, 10);

      // Verificar si el valor es un número flotante
      if (floatValue !== intValue) {
        setErrorIdentification('Debe ser un entero, sin puntos ni comas.');
      }
      // Si el valor no es un número entero o contiene una letra, entonces se muestra el error correspondiente
      else if (!Number.isInteger(intValue) || /\D/.test(value)) {
        setErrorIdentification('Debe ser un número.');
      } else if (intValue <= 0 || value.length > 10) {
        setErrorIdentification('Debe ser un número positivo de hasta 10 dígitos.');
      } else {
        setErrorIdentification('');
      }
    }

    const inputValue = type === 'checkbox' ? checked : value;
    setUserData({ ...userData, [name]: inputValue });

    // Comprobar si los campos requeridos están completos
    updateFormComplete();
  };



  const handleEnviarClick = () => {
  // Verificar si los campos requeridos están completos antes de realizar la acción
  if (!areFieldsComplete()) {
    return; // No hagas nada si el formulario no está completo
  }

  // Realiza cualquier lógica de envío de datos aquí
  setIsLoading(true);

  // Simular una demora en la conexión con el servidor (5 segundos)
  setTimeout(() => {
    // Simular un error (puedes cambiar esta lógica según tus necesidades)
    const hasError = setErrorEnviandoFormulario; // Cambiar a 'true' para simular un error

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
      }, 1000); // 2000 ms = 2 segundos
    }
  }, 1000); // 5000 ms = 5 segundos
};


const areFieldsComplete = () => {
  return (
    userData.name !== '' &&
    userData.identification !== '' &&
    userData.email !== '' &&
    userData.acceptTerms === true &&
    (userData.student || userData.visitor)
  );
};

  const buttonClass = areFieldsComplete() ? 'btnContinuarUnblock' : 'btnContinuarBlock';

  useEffect(() => {
    // Aquí puedes agregar efectos secundarios cuando cambie el estado de isLoading o errorOccurred
  }, [isLoading, errorOccurred]);


  return (
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
          <form onSubmit={handleModalSubmit}>
            <h2 className='modaltitulo'>Registro</h2>

            {userData.name && <div className='divtxtEscribiendo'><p className='ptxtEscribiendo'>Nombre:</p></div>}
            <input
              className='inputRegistro inputRegistronombre'
              placeholder='Nombre:'
              type="text"
              name="name"
              value={userData.name}
              onChange={handleNameChange}
            />
            {error && <div className='divError'><p className='errorTxt'>{error}</p></div>}

            {userData.identification && <div className='divtxtEscribiendo'><p className='ptxtEscribiendo'>D.I o código estudiantil:</p></div>}
            <input
              className='inputRegistro'
              placeholder='D.I o código estudiantil:'
              type="text"
              name="identification"
              value={userData.identification}
              onChange={handleIdentificationInputChange}
            />
            {errorIdentification && <div className='divError'><p className='errorTxt'>{errorIdentification}</p></div>}

            {userData.email && <div className='divtxtEscribiendo'><p className='ptxtEscribiendo'>Correo:</p></div>}
            <input
              className='inputRegistro'
              placeholder='Correo:'
              type="email"
              name="email"
              value={userData.email}
              onChange={handleEmailInputChange}
            />
            {errorEmail && <div className='divError'><p className='errorTxt'>{errorEmail}</p></div>}

            <label className='txtTerminos'>
              <input
                className={userData.acceptTerms ? 'mychecked' : 'mycheck'}
                type="checkbox"
                name="acceptTerms"
                checked={userData.acceptTerms}
                onChange={handleModalInputChange}
              />
              Estoy de acuerdo con los&nbsp;
              <a
                href="https://www.uao.edu.co/aviso-de-privacidad-de-la-universidad-autonoma-de-occidente/"
                target="_blank"
                rel="noopener noreferrer"
              >
                términos y condiciones
              </a>
            </label>

            <div className='rolCheckbox'>
              <label className='txtRol'>
                Estudiante:
                <input
                  className={userData.student ? 'mycheckedRol' : 'mycheckRol'}
                  type="checkbox"
                  name="student"
                  checked={userData.student}
                  onChange={handleModalInputChange}
                />
              </label>
              <label className='txtRol'>
                Visitante:
                <input
                  className={userData.visitor ? 'mycheckedRol' : 'mycheckRol'}
                  type="checkbox"
                  name="visitor"
                  checked={userData.visitor}
                  onChange={handleModalInputChange}
                />
              </label>
            </div>
            <button className={buttonClass} onClick={handleEnviarClick} disabled={!areFieldsComplete()}>
  Enviar
</button>

          </form>
        </Modal>
      )}
    </div>

  );
}

export { InputCodigo };


