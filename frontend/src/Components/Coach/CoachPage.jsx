import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCoachDetails } from "../../hook/coach/getCoach.js";
import CoachProfile from "./CoachProfile";
import CoachContent from "./CoachContent";
import '@css/Coach.css';
import Alert from "../Alert.jsx";

function CoachPage({ isConnected }) {
    const { id } = useParams();
    const [coach, setCoach] = useState({});
    const [loading, setLoading] = useState(true);

    const getCoach = async () => {
        const coachResult = await getCoachDetails(id);

        setCoach(coachResult);
        setLoading(false);
    };

    useEffect(() => {
        getCoach();
    }, [id]);

    return (
        <main>
            {
                loading
                    ? <div className="loading">Chargement...</div>
                    :
                    <div className="container-coach">
                        <CoachProfile coach={coach} getCoach={getCoach} isConnected={isConnected}/>
                        <div className="coach-content">
                            <CoachContent coach={coach} id={id}/>
                        </div>
                    </div>
            }
        </main>
    );
}

export default CoachPage;