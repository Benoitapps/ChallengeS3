import React, {useEffect, useState} from 'react';
import {useNavigate, useParams, useLocation, Link} from "react-router-dom";
import { getCoachDetails } from "../../hook/coach/getCoach.js";
import { getFranchisePrestations } from "../../hook/manager/getFranchisePrestations.js";
import ScheduleEditor from "./ScheduleEditor.jsx";
const env = import.meta.env;

function CoachDetails() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [coachLoading, setCoachLoading] = useState(false);
    const { coachId } = useParams();
    const [coach, setCoach] = useState([]);
    const [prestations, setPrestations] = useState([]);
    const [selectedPrestation, setSelectedPrestation] = useState(null);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            setCoachLoading(true);

            const coach = await getCoachDetails(coachId);

            setCoach(coach);
            

            const franchiseId = coach.franchise.id;

            let franchisePrestations = await getFranchisePrestations(franchiseId);
            // let availablePrestations = franchisePrestations.filter(prestation => !coach.prestations.includes(prestation));
            let availablePrestations = franchisePrestations.filter(prestation => !coach.prestations.map(p => p.id).includes(prestation.id));
            setPrestations(availablePrestations);
            if (availablePrestations.length > 0) {
                setSelectedPrestation(availablePrestations[0].id);
            }
            setCoachLoading(false);
        };

        loadData();
    }, [reload]);

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
        } else {
            setReload(!reload);
        }
    
        const data = await response.json();
        return data;

    };

    const saveSchedule = (schedule) => {
        // Logique pour sauvegarder les horaires de travail et les jours de congé
        console.log("Horaires de travail et jours de congé sauvegardés :", schedule);
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
                    {/* <select value={selectedPrestation} onChange={e => setSelectedPrestation(e.target.value)}>
                        {prestations.map(prestation => (
                            <option key={prestation.id} value={prestation.id}>{prestation.name} - {prestation.price} €</option>
                        ))}
                    </select>
                    <button onClick={handleSave}>Sauvegarder</button> */}
                    {prestations.length > 0 ? (
                    <>
                        <select value={selectedPrestation || ''} onChange={e => setSelectedPrestation(Number(e.target.value))}>
                            {prestations.map(prestation => (
                                <option key={prestation.id} value={prestation.id}>{prestation.name} - {prestation.price} €</option>
                            ))}
                        </select>
                        <button onClick={handleSave}>Sauvegarder</button>
                    </>
                ) : (
                    <p>Vous avez déjà ajouté à ce coach toutes les prestations de votre franchise.</p>
                )}

                    </div>
                    )}

                </div>
                <div>
                    <ScheduleEditor onSave={saveSchedule} />
                </div>
            </main>
        </div>
    );
}

export default CoachDetails;