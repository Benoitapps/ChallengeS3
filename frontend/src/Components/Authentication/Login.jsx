import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ handleConnect }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData(e.target);

        try {
            const result = await fetch('http://localhost:8888/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: data.get('email'),
                    password: data.get('password')
                })
            });

            if (!result.ok) {
                alert('Une erreur est survenue. Veuillez vérifier vos informations de connexion.');
                setLoading(false);
                return;
            }

            const body = await result.json();
            localStorage.setItem('token', body.token);
            handleConnect();
            navigate("/");
        } catch (error) {
            alert('Une erreur est survenue lors de la tentative de connexion. Veuillez réessayer plus tard.');
            setLoading(false);
        }
    };

    return (
        <div>
            <main>
                <h1>Connexion</h1>

                <form action="POST" onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', maxWidth: '300px', margin: 'auto' }}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Email" autoComplete="email" required />

                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" id="password" name="password" placeholder="Mot de passe" autoComplete="current-password" required/>

                    <input type="submit" value={loading ? 'Connexion en cours...' : 'Connexion'} disabled={loading} />
                </form>
            </main>
        </div>
    );
}

export default Login;
