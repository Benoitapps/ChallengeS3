import React, { useState } from 'react';
const env = import.meta.env;

function ForgotPassword() {
    const [inputValue, setInputValue] = useState(null)
    const [message, setMessage] = useState(false)
    const sendEmail = (e) => {
        e.preventDefault();
        fetch(`${env.VITE_URL_BACK}/api/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: inputValue })
        });
        setMessage(true);
    };

    return (
        <main>
            <form style={{display: 'flex', justifyContent: 'center', alignContent: 'center', flexDirection: 'column', maxWidth: '25rem', margin: '0 auto'}}>
                <label htmlFor="email">Entrez votre adresse mail</label>
                <input type="email" name="email" onChange={(e) => setInputValue(e.target.value)} />
                <button type='button' onClick={sendEmail}>
                    Envoyer
                </button>
            </form>
            <span>
                {
                    message
                    ? "Si votre email existe, regardez dans votre boite mail"
                    : ""
                }
            </span>
        </main>
    );
}

export default ForgotPassword;