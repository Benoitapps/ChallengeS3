import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCoachDetails } from "../../hook/coach/getCoach.js";
import '@css/Coach.css';

function CoachDetails() {
    const { id } = useParams();
    const [coach, setCoach] = useState({});
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getCoachDetails(id);
            setCoach(result);
            setLoading(false);
        };
        fetchData();


    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const user = JSON.parse(localStorage.getItem('myUser'));

        const addReview = await fetch(`http://localhost:8888/api/review_coaches`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                coach: `api/coaches/${id}`,
                client: `api/clients/${user.userId}`,
                note: parseInt(data.get('note')),
            }),
        });

        if (addReview.status === 201) {
            setSuccess(true);
        } else {
            setError('Une erreur est survenue');
        }
    };

    return (
        <main>
            {
                loading
                    ? <div className="loading">Chargement...</div>
                    :
                    <div className="container-coach">
                        <div className="coach-card">
                            <div className="coach-card__name">{coach.auth.firstname}</div>
                            <div className="coach-card__note">{
                                coach.averageRatingCoach === 0
                                    ? 'Pas de note'
                                    : coach.averageRatingCoach
                            }</div>
                        </div>

                        <form className="coach-review" onSubmit={(e) => handleSubmit(e)}>
                            <input type="number" name="note" min="1" max="5"/>
                            <input type="submit" value="Noter"/>
                        </form>
                        {
                            success && <p className="success">Votre note a bien été prise en compte</p>
                        }
                        {
                            error && <p className="error">{error}</p>
                        }
                    </div>
            }
        </main>
    );
}

export default CoachDetails;