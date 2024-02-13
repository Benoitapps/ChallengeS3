import React from 'react';
import '@css/Popup.css';

const Popup = ({ show, children, onClose, button1, button2, nameButton1, nameButton2, annuler,showButton,showButton1 }) => {
    if (!show) return null;

    const debounce = (fn, ms) => {
        let timer;

        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                fn(...args);
            }, ms);
        };
    };

    const debouncedButton1Click = debounce(button1, 1000);
    const debouncedButton2Click = debounce(button2, 1000);


    return (
        <div className="popup">
            <div className="popup__content">
                <svg className="close" onClick={onClose} width="35" height="35" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 7.05 16.95 6 12 10.95 7.05 6 6 7.05 10.95 12 6 16.95 7.05 18 12 13.05 16.95 18 18 16.95 13.05 12 18 7.05Z"></path>
                </svg>
                {children}

                <div className="popup__content__buttons">
                    {showButton1 && (
                        <button onClick={debouncedButton1Click} className="primary-button">{nameButton1}</button>
                    )}
                    {showButton && (
                        <button onClick={debouncedButton2Click} className="primary-button">
                            {nameButton2}
                        </button>
                    )}

                    <button onClick={onClose}>{annuler}</button>
                </div>
            </div>
        </div>
    );
};

export default Popup;

