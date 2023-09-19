import React, { useState, useEffect } from "react";
import "./inputCodigo.css";

import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import museolili from "./resources/museolili.png";
import { ModalHelp } from "../Modal";
// import { useAuth } from '../auth';
import { EnviandoCarga } from "../EnviandoCarga";
import { ErrorCarga } from "../ErrorCarga";
import { SentInformacion } from "../SentInformacion";
import axios from "axios";

function InputCodigo() {

  const [username, setUsername] = React.useState("");
  const [inputValue, setInputValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formComplete, setFormComplete] = useState(false); // Nuevo estado
  const [errors, setErrors] = useState({});

  const [userData, setUserData] = useState({
    name: "",
    identification: "",
    email: "",
    acceptTerms: false,
    student: false,
    visitor: false,
  });


  const [isLoading, setIsLoading] = useState(false);
  const [errorOccurred, setErrorOccurred] = useState(false);
  const [sentInformation, setSentInformation] = useState(false);
  const [errorEmail, setErrorEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [errorIdentification, setErrorIdentification] = useState("");
  const [errorEnviandoFormulario, setErrorEnviandoFormulario] = useState(false);

  const updateFormComplete = () => {
    const { name, email } = userData;
    const isComplete =
      name &&
      email &&
      inputValue.length === 4 &&
      inputValue.toUpperCase() === "ASDW";
    setFormComplete(isComplete);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    // Validar la cadena ingresada
    if (value.length === 4 && value.toUpperCase() === "ASDW") {
      setShowModal(true);
    }

    // Comprobar si los campos requeridos están completos
    updateFormComplete();
  };

  const validateName = (name) => {
    const regex = /^[a-zA-Z\s]*$/;
    if (!regex.test(name)) {
      return "The name cannot contain any numbers.";
    }
    return "";
  };

  const validateID = (id) => {
    const regex = /^\d+$/; // This regex matches only numeric digits
    if (!regex.test(id)) {
      return "The ID should only contain numeric digits.";
    }
    return "";
  };

  const validateEmail = (email) => {
    if (!email.includes("@") || !email.endsWith(".com")) {
      return "The email must contain '@' and end with '.com'.";
    }
    return "";
  };

  const areFieldsComplete = () => {
    // Ensure all string fields are not empty
    if (!userData.name || !userData.identification || !userData.email) {
      return false;
    }

    // Check if email contains "@" and ".com"
    if (!userData.email.includes("@") || !userData.email.endsWith(".com")) {
      return false;
    }

    // Ensure both checkboxes are checked
    if (!userData.acceptTerms || !(userData.student || userData.visitor)) {
      return false;
    }

    return true;
  };

  const handleModalInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === "checkbox" ? checked : value;
    if (name === "student" && checked) {
      setUserData({ ...userData, student: true, visitor: false });
    } else if (name === "visitor" && checked) {
      setUserData({ ...userData, visitor: true, student: false });
    } else {
      setUserData({ ...userData, [name]: inputValue });
    }
    updateFormComplete();
  };

  const handleEnviarClick = () => {
    if (!areFieldsComplete()) {
      console.warn("Not all fields are complete.");
      return; // Exit the function early if fields are not complete
    }
  
    // At this point, all fields are complete
    console.log("Sending the following data:", userData);
  
    // In a real-world application, you'd make an API call or some other operation
    // For now, we just log that the data has been sent
    console.log("Data has been sent successfully!");
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      Object.keys(errors).length === 0 &&
      userData.email &&
      userData.password
    ) {
      try {
        const response = await axios.post("/api/register", userData);
        console.log("User registered:", response.data);
      } catch (error) {
        console.error("Error registering user:", error.response.data);
      }
    }
  };

  const buttonClass = areFieldsComplete()
    ? "btnContinuarUnblock"
    : "btnContinuarBlock";

  useEffect(() => {
    // Aquí puedes agregar efectos secundarios cuando cambie el estado de isLoading o errorOccurred
  }, [isLoading, errorOccurred]);
  
  return (
    <div className="cont_inicio">
      <ModalHelp />

      <h1 className="black">Bienvenidos al Museo Interactivo Lili</h1>

      <label className="parrafos">
        Introduce el código para iniciar la experiencia.
      </label>

      <input
        className="input_yellow"
        value={inputValue}
        onChange={handleInputChange}
        maxLength={4}
      />
      <img src={museolili} alt="Logo del museo lili" />

      <Modal
        className="modalinput"
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Registro de Datos"
      >
        <form onSubmit={handleSubmit}>
          <h2 className="modaltitulo">Registro</h2>

          {userData.name && (
            <div className="divtxtEscribiendo">
              <p className="ptxtEscribiendo">Nombre:</p>
            </div>
          )}

          <input
            className="inputRegistro inputRegistronombre"
            placeholder="Nombre:"
            type="text"
            name="name"
            value={userData.name}
            onChange={(e) => {
              setUserData({ ...userData, name: e.target.value });
              validateName();
            }}
          />

          {error && (
            <div className="divError">
              <p className="errorTxt">{error}</p>
            </div>
          )}

          {userData.identification && (
            <div className="divtxtEscribiendo">
              <p className="ptxtEscribiendo">D.I o código estudiantil:</p>
            </div>
          )}

          <input
            className="inputRegistro"
            placeholder="D.I o código estudiantil:"
            type="text"
            name="identification"
            value={userData.identification}
            onChange={(e) => {
              setUserData({ ...userData, identification: e.target.value });
              validateID();
            }}
          />

          {errorIdentification && (
            <div className="divError">
              <p className="errorTxt">{errorIdentification}</p>
            </div>
          )}

          {userData.email && (
            <div className="divtxtEscribiendo">
              <p className="ptxtEscribiendo">Correo:</p>
            </div>
          )}

          <input
            className="inputRegistro"
            placeholder="Correo:"
            type="email"
            name="email"
            value={userData.email}
            onChange={(e) => {
              setUserData({ ...userData, email: e.target.value });
              validateEmail();
            }}
          />

          {errorEmail && (
            <div className="divError">
              <p className="errorTxt">{errorEmail}</p>
            </div>
          )}

          <label className="txtTerminos">
            <input
              className={userData.acceptTerms ? "mychecked" : "mycheck"}
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

          <div className="rolCheckbox">
            <label className="txtRol">
              Estudiante:
              <input
                className={userData.student ? "mycheckedRol" : "mycheckRol"}
                type="checkbox"
                name="student"
                checked={userData.student}
                onChange={handleModalInputChange}
              />
            </label>

            <label className="txtRol">
              Visitante:
              <input
                className={userData.visitor ? "mycheckedRol" : "mycheckRol"}
                type="checkbox"
                name="visitor"
                checked={userData.visitor}
                onChange={handleModalInputChange}
              />
            </label>
          </div>

          <button
            className={buttonClass}
            onClick={handleEnviarClick}
            disabled={!areFieldsComplete()}
          >
            Enviar
          </button>
        </form>
      </Modal>
    </div>
  );
}

export { InputCodigo };
