import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCoachDetails } from "../../hook/coach/getCoach.js";
import CoachProfile from "./CoachProfile";
import CoachContent from "./CoachContent";
import '@css/Coach.css';

function CoachPage() {
    const { id } = useParams();
    const [coach, setCoach] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCoach = async () => {
            const coachResult = await getCoachDetails(id);

            setCoach(coachResult);
            setLoading(false);
        };
        getCoach();
    }, []);

    return (
        <main>
            {
                loading
                    ? <div className="loading">Chargement...</div>
                    :
                    <div className="container-coach">
                        <CoachProfile coach={coach}/>
                        <div className="coach-content">
                            <CoachContent coach={coach} id={id}/>
                        </div>
                    </div>
            }
        </main>
    );
}

export default CoachPage;