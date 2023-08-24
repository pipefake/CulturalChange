import React, { useState } from "react"; import "./Modal.css";
import helpIcon from './resources/help-icon.png';
import closeIcon from './resources/closeIcon.png';
import ImageSlider from './ImageSlider';

function ModalHelp() {
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    return (
        <>

            <button onClick={toggleModal} className="btn-modal">
                <img src={helpIcon} alt="Icono de ayuda" />
            </button>

            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <h2>Ayuda</h2>

                        <ImageSlider />
                        <button className="close-modal" onClick={toggleModal}>
                            <img src={closeIcon} />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
export { ModalHelp };