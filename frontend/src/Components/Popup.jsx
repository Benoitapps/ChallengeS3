import React, { useState } from 'react';

// Composant de la fenêtre modale
function Modal(props) {
    console.log("props",props)
    console.log("prop.show",props.show);
    if (!props.show) {
        return null;
    }
    return (
        <div className="modal">
            <div className="modal-content">
        <span className="close" onClick={props.onClose}>
          &times;
        </span>
                {props.children}
            </div>
        </div>
    );
}

// Composant principal
function PopUp() {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <button onClick={openModal}>Ouvrir la pop-up</button>

            <Modal show={showModal} onClose={closeModal}>
                <h2>Contenu de la pop-up</h2>
                <p>Ceci est le contenu de la pop-up.</p>
            </Modal>
        </div>
    );
}

export default PopUp;
