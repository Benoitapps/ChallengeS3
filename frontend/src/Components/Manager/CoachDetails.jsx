import {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import { getCoachDetails } from "../../hook/coach/getCoach.js";
import { getFranchisePrestations } from "../../hook/manager/getFranchisePrestations.js";
import ScheduleEditor from "./ScheduleEditor.jsx";
import VacationEditor from "./VacationEditor.jsx";
import '@css/CoachDetailsManager.css';
import { useTranslation } from "react-i18next";

const env = import.meta.env;

function CoachDetails() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [coachLoading, setCoachLoading] = useState(false);
    const { coachId } = useParams();
    const [coach, setCoach] = useState([]);
    const [prestations, setPrestations] = useState([]);
    const [selectedPrestation, setSelectedPrestation] = useState(null);
    const { t } = useTranslation();

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
    }, [coachId]);

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
            const newCoachInfos = await getCoachDetails(coachId);

            setCoach(newCoachInfos);
        }
    
        const data = await response.json();
        return data;
    };

    const saveSchedule = (schedule) => {
        // Logique pour sauvegarder les horaires de travail et les jours de congé
        console.log("Horaires de travail et jours de congé sauvegardés :", schedule);
    };
                

    return (
        <main>
            {coachLoading ? (
                <div>{t('Loading')}...</div>
            ) : (
                <div className="container-coach" key={coach.id}>
                    <div className="coach-profile-card">
                        <div className="coach-profile-card__img">
                            <img src="https://thispersondoesnotexist.com/"/>
                        </div>
                        {
                            coach.auth &&
                            <h2 className="coach-profile-card__name">{coach.auth.firstname} {coach.auth.lastname}</h2>
                        }
                    </div>
                    <div className="coach-content">
                        <div className="coach-content__head">
                            <div className="coach-content__head__add-prestations">
                                <h3 className="coach-content__head__biography">Ajouter une prestation</h3>

                                {prestations.length > 0 ? (
                                    <>
                                        <select value={selectedPrestation || ''}
                                                onChange={e => setSelectedPrestation(Number(e.target.value))}>
                                            {prestations.map(prestation => (
                                                <option key={prestation.id}
                                                        value={prestation.id}>{prestation.name} - {prestation.price} €</option>
                                            ))}
                                        </select>
                                        <button className="primary-button" onClick={handleSave}>Sauvegarder</button>
                                    </>
                                ) : (
                                    <p>Vous avez déjà ajouté à ce coach toutes les prestations de votre franchise.</p>
                                )}
                            </div>

                            <ul className="coach-content__head__prestations">
                                <h4>Prestations</h4>
                                {coach.prestations && coach.prestations.length === 0 ? (
                                    <p>Ce coach n'a pas encore de prestations associées</p>
                                ) : (
                                    <ul className="coach-content__prestations">
                                        {
                                            coach.prestations && coach.prestations.map((prestation, index) => {
                                                return (
                                                    <li key={index}>
                                                        <Link to={`/prestation/${prestation.id}/coach/${coachId}/add`}
                                                              className="coach-content__prestations__item">
                                                            <div className="coach-content__prestations__item__img">
                                                                <img src="https://picsum.photos/300/300"
                                                                     alt={prestation.franchise.name}/>
                                                            </div>
                                                            <div className="coach-content__prestations__item__content">
                                                                <div
                                                                    className="coach-content__prestations__item__content__top">
                                                                    <h5 className="coach-content__prestations__name">{prestation.name}</h5>
                                                                    <p className="coach-content__franchises__name">{prestation.franchise.name}</p>
                                                                    <p className="coach-content__franchises__address">{prestation.franchise.address}</p>
                                                                </div>
                                                                <p className="coach-content__prestations__price">
                                                                    <span>{prestation.price}€</span> / séance</p>
                                                            </div>
                                                        </Link>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                )}
                            </ul>

                            <ScheduleEditor coachId={coachId}/>
                            {/*<VacationEditor coachId={coachId}/>*/}
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

export default CoachDetails;