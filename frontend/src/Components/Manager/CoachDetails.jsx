import React, {useEffect, useState} from 'react';
import {useNavigate, useParams, useLocation, Link} from "react-router-dom";
import { getCoachDetails } from "../../hook/coach/getCoach.js";
import { getFranchisePrestations } from "../../hook/manager/getFranchisePrestations.js";
const env = import.meta.env;

function CoachDetails() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [coachLoading, setCoachLoading] = useState(false);
    const { coachId } = useParams();
    const location = useLocation();
    const franchiseName = location.state ? location.state.franchiseName : 'nom inconnu';
    const [coach, setCoach] = useState([]);
    const [prestations, setPrestations] = useState([]);
    const [selectedPrestation, setSelectedPrestation] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            setCoachLoading(true);

            let coach = await getCoachDetails(coachId);

            setCoach(coach);
            

            const franchiseId = coach.franchise.id;

            let franchisePrestations = await getFranchisePrestations(franchiseId);
            // let availablePrestations = franchisePrestations.filter(prestation => !coach.prestations.includes(prestation));
            let availablePrestations = franchisePrestations.filter(prestation => !coach.prestations.map(p => p.id).includes(prestation.id));
            setPrestations(availablePrestations);
            setCoachLoading(false);
        };

        loadData();
    }, []);

    const handleSave = async () => {
        await saveCoachPrestation(coachId, selectedPrestation);
        setPrestations(prestations.filter(prestation => prestation !== selectedPrestation));
    };

    const saveCoachPrestation = async (coachId, prestationId) => {
        const response = await fetch(`${env.VITE_URL_BACK}/api/coaches/${coachId}/prestations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ prestationId: prestationId }),
        });
    
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
        return data;

    };
                

    return (
        <div>
            <main>
                <div>

                    <span>Détails du coach :</span>
                    {coachLoading ? (
                        <div>Chargement...</div>
                    ) : (
                    <div key={coach.id}>
                        {coach.auth && <h2>Nom : {coach.auth.firstname} {coach.auth.lastname}</h2>}
                        <h3>Prestations :</h3>
                        {coach.prestations && coach.prestations.length === 0 ? (
                            <div>Ce coach n'a pas encore de prestations associées</div>
                        ) : (
                            coach.prestations && coach.prestations.map((prestation) => (
                                <div key={prestation.id} style={{ marginBottom: '20px' }}>
                                    <p>Libellé : {prestation.name}</p>
                                    <p>Prix : {prestation.price} €</p>
                                </div>
                            ))
                        )}

                    <h3>Ajouter une prestation :</h3>
                    <select value={selectedPrestation} onChange={e => setSelectedPrestation(e.target.value)}>
                        {prestations.map(prestation => (
                            <option key={prestation.id} value={prestation.id}>{prestation.name} - {prestation.price} €</option>
                        ))}
                    </select>
                    <button onClick={handleSave}>Sauvegarder</button>

                    </div>
                    )}

                </div>
            </main>
        </div>
    );
}

export default CoachDetails;