import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCoachDetails } from "../../hook/coach/getCoach.js";
import { addReview } from "../../hook/coach/addReview.js";
import { getUserId } from "../User/DecodeUser.jsx";
import CoachProfile from "./CoachProfile";
import CoachContent from "./CoachContent";
import '@css/Coach.css';

function CoachPage() {
    const { id } = useParams();
    const [coach, setCoach] = useState({});
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getCoach = async () => {
            const coachResult = await getCoachDetails(id);

            setCoach(coachResult);
            setLoading(false);
        };
        getCoach();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);

        if(
          data.get('note') > 0 ||
          data.get('note') < 6
        ) {
            const user = await getUserId();
            const sendReview = await addReview(id, user, parseInt(data.get('note')));

            if (sendReview.status === 201) {
                setSuccess(true);
            } else {
                setError('Une erreur est survenue');
            }
        }
    };

    return (
        <main>
            {
                loading
                    ? <div className="loading">Chargement...</div>
                    :
                    <div className="container-coach">
                        <CoachProfile coach={coach}/>
                        <div className="coach-content">
                            <CoachContent coach={coach}/>

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
                    </div>
            }
        </main>
    );
}

export default CoachPage;