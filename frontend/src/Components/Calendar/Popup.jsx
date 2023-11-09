import React from 'react';
import '@css/Popup.css';

const Popup = ({ show, children, onClose, onOk }) => {
    if (!show) return null;

    const handleOk = () => {
        if (onOk) {
            onOk();
        }
        onClose();
    };

    return (
        <div className="popup">
            <div className="popup__content">
                <svg className="close" onClick={onClose} width="35" height="35" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 7.05 16.95 6 12 10.95 7.05 6 6 7.05 10.95 12 6 16.95 7.05 18 12 13.05 16.95 18 18 16.95 13.05 12 18 7.05Z"></path>
                </svg>
                {children}
                <div className="popup__content__buttons">
                    <button onClick={handleOk} className="primary-button">Réserver</button>
                    <button onClick={onClose}>Annuler</button>
                </div>
            </div>
        </div>
    );
};

export default Popup;
