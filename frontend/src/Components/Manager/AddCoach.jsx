import React, {useState} from 'react';
import {useNavigate, useParams, useLocation} from "react-router-dom";
const env = import.meta.env;

function AddCoach() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { franchiseId } = useParams();
    const location = useLocation();
    const franchiseName = location.state ? location.state.franchiseName : 'nom inconnu';

    const handleSubmit = async (e, userType) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData(e.target);

        try {
            const result = await fetch(`${env.VITE_URL_BACK}/api/coach/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    firstname: data.get('firstname'),
                    lastname: data.get('lastname'),
                    email: data.get('email'),
                    plainPassword: data.get('password'),
                    franchiseId: franchiseId,
                }),
            });
            const body = await result.json();
            if (result.status === 422) {
                setError(body.violations[0].message + ' ' + body.violations[0].propertyPath);
            } else if (!result.ok) {
                setError('Une erreur est survenue');
            } else {
                navigate('/manager/home/club/'+franchiseId);
            }
        } catch (error) {
            setError('Une erreur est survenue');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <main className="authentification">
                <div className="login-signup">

                    <span>Ajouter un coach pour la franchise "{franchiseName}" :</span>

                    <form className="login-signup__form" onSubmit={handleSubmit}>
                        {
                            error && <p className="error">{error}</p>
                        }
                        <input type="text" id="firstname" name="firstname" placeholder="Prénom" autoComplete="lastname" required></input>
                        <input type="text" id="lastname" name="lastname" placeholder="Nom" autoComplete="firstname" required></input>
                        <input type="email" id="email" name="email" placeholder="Email" autoComplete="email" required></input>
                        <input type="password" id="password" name="password" placeholder="Mot de passe" autoComplete="current-password" required></input>
                        <input type="password" id="passwordConfirm" name="passwordConfirm" placeholder="Confirmation du mot de passe" autoComplete="confirm-password" required></input>
                        <div className="login-signup__form__submit">
                            <input type="submit" value="Créer le compte" disabled={loading}/>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default AddCoach;