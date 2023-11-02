import React from 'react';
import '../../assets/css/Popup.css';

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
            <div className="popup-content">
                <span className="close" onClick={onClose}>
                    &times;
                </span>
                {children}
                <button onClick={handleOk}>Ok</button>
                <button onClick={onClose}>Annuler</button>
            </div>
        </div>
    );
};

export default Popup;
