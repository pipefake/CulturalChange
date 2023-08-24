import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import museolili from './resources/museolili.png';
import './inputCodigo.css';
import { BtnContinuar } from '../BtnContinuar';
import { ModalHelp } from '../Modal';

function InputCodigo() {
    const [inputValue, setInputValue] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [userData, setUserData] = useState({
        name: '',
        identification: '',
        email: '',
        acceptTerms: false,
    });

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

    const handleModalSubmit = () => {
        // Aquí puedes realizar cualquier acción con los datos ingresados en el modal
        // Por ejemplo, enviar los datos al servidor, realizar alguna validación, etc.
        console.log(userData);
        setShowModal(false);

        // Redirigir a la ruta "/introduccion"
        navigate('/introduccion');
    };

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
                <Modal className="modalinput"
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
                                name="acceptTerms"
                                checked={userData.acceptTerms}
                                onChange={handleAcceptTerms}
                            />
                        </label>
                        <label className='txtRol'>
                            Visitante:
                            <input
                                className='mycheckRol'
                                type="checkbox"
                                name="acceptTerms"
                                checked={userData.acceptTerms}
                                onChange={handleAcceptTerms}
                            />
                        </label>
                    </div>
                    <button className="btnContinuarBlock">

                        <Link className='txtBTN' to={`/introduccion`}>
                            Enviar
                        </Link>
                    </button>
                </Modal>
            </div>
        </>

    );
}

export { InputCodigo };
