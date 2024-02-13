import React, {useState} from 'react';
import {useNavigate, useParams, useLocation} from "react-router-dom";
const env = import.meta.env;

function AddPrestation() {
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
            const result = await fetch(`${env.VITE_URL_BACK}/api/prestations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    name: data.get('name'),
                    description: data.get('description'),
                    price: parseFloat(data.get('price')),
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
                //success add prestation
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

                    <span>Ajouter une prestation pour la franchise "{franchiseName}" :</span>

                    <form className="login-signup__form" onSubmit={handleSubmit}>
                        {
                            error && <p className="error">{error}</p>
                        }
                        <input type="text" id="name" name="name" placeholder="Libellé" autoComplete="name" required></input>
                        <input type="text" id="description" name="description" placeholder="Description" autoComplete="description" required></input>
                        <input type="number" step="any" id="price" name="price" placeholder="Prix" autoComplete="price" required></input>
                        <div className="login-signup__form__submit">
                            <input type="submit" value="Ajouter la prestation" disabled={loading}/>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default AddPrestation;