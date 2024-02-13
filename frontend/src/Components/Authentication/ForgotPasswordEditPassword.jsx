import React from 'react';
import { useParams } from 'react-router-dom';

function ForgotPasswordEditPassword() {
    const { token } = useParams();

    const saveNewPassword = () => {
        const password = document.getElementById('password').value;
        const passwordConfirmation = document.getElementById('password-confirmation').value;

        if (password !== passwordConfirmation) {
            alert('Les mots de passe ne correspondent pas');
            return;
        }

        // min 4 characters and  1 number
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;
        if (!regex.test(password)) {
            alert('Le mot de passe doit contenir au moins 4 caractères et 1 chiffre');
            return;
        }

        fetch(`${import.meta.env.VITE_URL_BACK}/api/forgot-password?token=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password: password })
        }).then(response => {
            if (response.ok) {
                alert('Mot de passe modifié');
            } else {
                alert('Erreur lors de la modification du mot de passe');
            }
            window.location.href = '/login';
        });
    };

    return (
        <main>
            <input type="hidden" name="token" value={token} />
            <div style={{margin: '0 auto', maxWidth: '25rem'}}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    Nouveau mot de passe
                    <input type="password" name="password" id="password" required/>
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    Confirmation du mot de passe
                    <input type="password" name="password-confirmation" id="password-confirmation" required/>
                </div>
                <button type='button' onClick={() => saveNewPassword()}>
                    Sauvegarder
                </button>
            </div>
        </main>
    );
}

export default ForgotPasswordEditPassword;