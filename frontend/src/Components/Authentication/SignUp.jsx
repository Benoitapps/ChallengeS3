import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData(e.target);

        if (data.get('password') !== data.get('passwordConfirm')) {
            alert('Les mots de passe ne correspondent pas');
            setLoading(false);
            return;
        }

        try {
            const result = await fetch('http://localhost:8888/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstname: data.get('firstname'),
                    lastname: data.get('lastname'),
                    email: data.get('email'),
                    plainPassword: data.get('password'),
                }),
            });
            console.log(result);
            const body = await result.json();
            console.log(body);
            if (result.status === 422) {
                setError(body.violations[0].message + ' ' + body.violations[0].propertyPath);
            } else if (!result.ok) {
                setError('Une erreur est survenue');
            } else {
                navigate("/login");
            }
        } catch (error) {
            setError('Une erreur est survenue');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <main>
                <h1>Inscription</h1>

                <form action="POST" onSubmit={handleSubmit} style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', maxWidth: '300px', margin: 'auto'}}>
                    <label htmlFor="firstname">Prénom</label>
                    <input type="text" id="firstname" name="firstname" placeholder="Prénom" autoComplete="lastname" required></input>

                    <label htmlFor="lastname">Nom</label>
                    <input type="text" id="lastname" name="lastname" placeholder="Nom" autoComplete="firstname" required></input>

                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Email" autoComplete="email" required></input>

                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" id="password" name="password" placeholder="Mot de passe" autoComplete="current-password" required></input>

                    <label htmlFor="passwordConfirm">Confirmation du mot de passe</label>
                    <input type="password" id="passwordConfirm" name="passwordConfirm" placeholder="Confirmation du mot de passe" autoComplete="confirm-password" required></input>

                    <input type="submit" value="Inscription" disabled={loading}/>
                </form>
                <div style={{color: 'red'}}>{error}</div>
            </main>
        </div>
    );
}

export default SignUp;