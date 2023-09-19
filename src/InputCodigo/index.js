import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./inputCodigo.css";
import Modal from "react-modal";
import museolili from "./resources/museolili.png";
import { ModalHelp } from "../Modal";
import axios from "axios";
import { EnviandoCarga } from "../EnviandoCarga";
import { ErrorCarga } from "../ErrorCarga";
import { SentInformacion } from "../SentInformacion";

function InputCodigo() {
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


  const navigate = useNavigate();

  const closeErrorModal = () => {
    setErrorOccurred(false);
  };

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

  const areFieldsComplete = () => {
    const nameRegex = /^[a-zA-Z\s]*$/;
    const idRegex = /^[0-9]+$/;

    // Check if any of the fields is empty
    if (!userData.name || !userData.identification || !userData.email) {
      return false;
    }

    // Check if name contains numbers or special characters
    if (!nameRegex.test(userData.name)) {
      return false;
    }

    // Check if ID contains anything other than numeric digits
    if (!idRegex.test(userData.identification)) {
      return false;
    }

    // Check if email contains "@" and ".com"
    if (!userData.email.includes("@") || !userData.email.endsWith(".com")) {
      return false;
    }

    // Ensure acceptTerms is checked and either student or visitor is checked
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

  const handleValidation = () => {
    const newErrors = {};
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const numberPattern = /^[0-9]+$/;

    // Validate name
    if (/\d/.test(userData.name)) {
      // check if there's any digit in the name
      newErrors.name = "Name cannot contain numbers.";
    }

    // Validate ID
    if (!numberPattern.test(userData.identification)) {
      newErrors.identification = "ID should only be numeric digits.";
    }

    // Validate email
    if (!emailPattern.test(userData.email)) {
      newErrors.email =
        'Invalid email format. Email must contain "@" and end with ".com".';
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!areFieldsComplete()) {
      return; // Don't proceed if the form isn't complete
    }

    setIsLoading(true);

    // Simulate a delay for the server connection (5 seconds)
    setTimeout(async () => {
      if (Object.keys(errors).length === 0) {
        try {
          console.log("Conditions met. Attempting to send data...");
          const response = await axios.post("/api/register", userData);
          console.log("User registered:", response.data);

          setIsLoading(false);

          // If successful, show the SentInformacion modal for 2 seconds
          setSentInformation(true);

          setTimeout(() => {
            setSentInformation(false);
            // Redirect to "/introduccion" after showing the modal
            navigate("/introduccion");
          }, 2000); // 2 seconds

        } catch (error) {
          console.error("Error registering user:", error.response.data);

          // On error, show the error modal and turn off the loading state
          setErrorOccurred(true);
          setIsLoading(false);
        }
      } else {
        // If there are validation errors, just turn off the loading state
        setIsLoading(false);
      }
    }, 5000); // 5 seconds
};

  const handleEnviarClick = async () => {
    console.log("handleEnviarClick called");
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
              handleValidation();
            }}
          />
          {errors.name && (
            <div style={{ color: "red", fontSize: "12px" }}>{errors.name}</div>
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
              handleValidation();
            }}
          />
          {errors.identification && (
            <div style={{ color: "red", fontSize: "12px" }}>
              {errors.identification}
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
            value={userData.email || ""}
            onChange={(e) => {
              setUserData({ ...userData, email: e.target.value });
              handleValidation();
            }}
          />
          {errors.email && (
            <p style={{ color: "red", fontSize: "6px" }}>{errors.email}</p>
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
            type="submit"
            disabled={!areFieldsComplete()}
            onClick={handleEnviarClick}
          >
            Enviar
          </button>
        </form>
      </Modal>
      )}
    </div>
  );
}

export { InputCodigo };
