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
    rol: "",
    finalizadaTarea: "false",
    tipoUsuario: "",
    codigoSala: "algo",
  });

  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [isVisitor, setIsVisitor] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorOccurred, setErrorOccurred] = useState(false);
  const [sentInformation, setSentInformation] = useState(false);

  const [errorName, setErrorName] = useState({});
  const [errorEmail, setErrorEmail] = useState({});
  const [errorIdentification, setErrorIdentification] = useState({});

  const [roomCode, setRoomCode] = useState("");

  const navigate = useNavigate();

  const closeErrorModal = () => {
    setErrorOccurred(false);
  };

  // Handle the change of the student checkbox
  const handleStudentChange = (event) => {
    const isChecked = event.target.checked;
    setIsStudent(isChecked);
    setIsVisitor(!isChecked); // If student is checked, visitor becomes unchecked and vice versa
    setUserData((prevData) => ({
      ...prevData,
      rol: isChecked ? "Estudiante" : isVisitor ? "Visitante" : "", // Adjust based on checkboxes' state
      tipoUsuario: isChecked ? "Estudiante" : prevData.tipoUsuario,
    }));
  };

  // Handle the change of the visitor checkbox
  const handleVisitorChange = (event) => {
    const isChecked = event.target.checked;
    setIsVisitor(isChecked);
    setIsStudent(!isChecked); // If visitor is checked, student becomes unchecked and vice versa
    setUserData((prevData) => ({
      ...prevData,
      rol: isChecked ? "Visitante" : isStudent ? "Estudiante" : "", // Adjust based on checkboxes' state
      tipoUsuario: isChecked ? "Visitante" : prevData.tipoUsuario,
    }));
  };

  useEffect(() => {
    // This function is executed once when the component mounts
    // to fetch the room code.
    fetchRoomCode();
  }, []); // An empty dependency array means this useEffect will run once when the component mounts and not on subsequent re-renders.

  const fetchRoomCode = async () => {
    try {
      const response = await axios.get("https://testdeploy-production-9d97.up.railway.app/roomCode");
      console.log("Full Response:", response.data); // Log entire response
      if (response.data.length > 0 && response.data[0].code) {
        setRoomCode(response.data[0].code); // Set the room code state
      }
    } catch (error) {
      console.error("Error fetching room code:", error);
    }
  };

  const updateFormComplete = () => {
    const { name, email } = userData;
    const isComplete =
      name && email && inputValue.length === 4 && inputValue === roomCode; // compare with roomCode from the state
    setFormComplete(isComplete);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    // Validar la cadena ingresada
    if (value.length === 4 && value.toUpperCase() === roomCode) {
      setShowModal(true);
    } else if (value.length === 4) {
      event.target.classList.add('invalid-code');
      setTimeout(() => {
        event.target.classList.remove('invalid-code');
        event.target.value = "";
      }, 600); // 0.5 segundos

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
    if (!acceptTerms || !(isStudent || isVisitor)) {
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

  const handleValidationErrorName = () => {
    const newErrors = {};

    const namePattern = /^[a-zA-Z]+$/; // Only letters allowed

    if (!namePattern.test(userData.name)) {
      newErrors.name = "El nombre solo debe contener letras.";
    } else if (userData.name.length > 30) {
      newErrors.name = "El nombre no puede contener más de 30 caracteres.";
    }

    setErrorName(newErrors);
  };

  const handleValidationErrorEmail = () => {
    const newErrors = {};

    // Regular expression pattern checks for "@" and either ".com" or ".co" domains
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.(com|co)$/;

    if (!emailPattern.test(userData.email)) {
      newErrors.email = "El email debe contener '@' y 'gmail.com'";
    }

    setErrorEmail(newErrors);
  };

  const handleValidationErrorIdentification = () => {
    const numberPattern = /^[0-9]{1,10}$/; // Only numbers allowed and max length of 10
    const newErrors = {};

    if (!numberPattern.test(userData.identification)) {
      if (userData.identification.length > 10) {
        newErrors.identification =
          "La identificación no puede tener más de 10 dígitos.";
      } else {
        newErrors.identification =
          "La identificación solo debe contener números.";
      }
    }

    setErrorIdentification(newErrors);
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
          const response = await axios.post(
            "https://testdeploy-production-9d97.up.railway.app/users",
            {
              name: userData.name,
              identification: userData.identification,
              email: userData.email,
              rol: userData.rol,
              finalizadaTarea: userData.finalizadaTarea,
              tipoUsuario: userData.tipoUsuario,
              codigoSala: userData.codigoSala,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          console.log("User registered:", response.data);
          const userId = response.data.userId; // Grab the userId from the response
          console.log("User ID:", userId); // Log the user ID for debugging
          localStorage.setItem("userId", userId); // Store the userId in localStorage

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
    //Consola para verificar que tiene los estados, recordar meter userData como parametro en esta funcion
    //console.log("AQUI MIRAME" + userData.name + userData.identification + userData.email + userData.rol + userData.finalizadaTarea + userData.tipoUsuario + userData.codigoSala)
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
                handleValidationErrorName();
              }}
            />
            {errorName.name && <div className="errorTxt">{errorName.name}</div>}

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
                handleValidationErrorIdentification();
              }}
            />
            {errorIdentification.identification && (
              <div className="errorTxt">
                {errorIdentification.identification}
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
                handleValidationErrorEmail();
              }}
            />
            {errorEmail.email && <p className="errorTxt">{errorEmail.email}</p>}

            <label className="txtTerminos">
              <input
                className={acceptTerms ? "mychecked" : "mycheck"}
                type="checkbox"
                name="acceptTerms"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
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
                  className={isStudent ? "mycheckedRol" : "mycheckRol"}
                  type="checkbox"
                  name="student"
                  checked={isStudent}
                  onChange={handleStudentChange}
                />
              </label>

              <label className="txtRol">
                Visitante:
                <input
                  className={isVisitor ? "mycheckedRol" : "mycheckRol"}
                  type="checkbox"
                  name="visitor"
                  checked={isVisitor}
                  onChange={handleVisitorChange}
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
