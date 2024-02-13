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
            const result = await fetch(`${env.VITE_URL_BACK}/api/users`, {
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
                    userType: 'coach',
                    franchiseId: franchiseId,
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
                navigate('/manager/home/club/'+franchiseId);
                // try {
                //     const result = await fetch(`${env.VITE_URL_BACK}/api/email`, {
                //         method: 'POST',
                //         headers: {
                //             'Content-Type': 'application/json',
                //             Authorization: `Bearer ${localStorage.getItem("token")}`,
                //         },
                //         body: JSON.stringify({
                //             email: data.get('email'),
                //             subject: 'Bienvenue chez MyCoach',
                //             message: `Bonjour ${data.get('firstname')} ${data.get('lastname')},\n\nVotre entreprise vient de créer votre compte MyCoach. \n\nVous pouvez vous connecter à l'application MyCoach avec l'adresse email suivante : ${data.get('email')}\n\nVotre mot de passe provisoire est le suivant : ${data.get('password')}\n\nVeuillez le changer dès votre 1ère connexion dans votre profil.\n\nA bientôt sur MyCoach !\n\nCe message vous a été envoyé via une adresse mail n'acceptant pas les réponses. Pour toute question, veuillez contacter votre entreprise.`,
                //         }),
                //     });
                //     console.log(result);
                //     const body = await result.json();
                //     console.log(body);
                //     if (result.status === 422) {
                //         setError(body.violations[0].message + ' ' + body.violations[0].propertyPath);
                //     } else if (!result.ok) {
                //         setError('Une erreur est survenue');
                //     } else {
                //         //success mail
                //         navigate("/manager/home");
                //     }
                // } catch (error) {
                //     setError('Une erreur est survenue');
                // } finally {
                //     setLoading(false);
                // }
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