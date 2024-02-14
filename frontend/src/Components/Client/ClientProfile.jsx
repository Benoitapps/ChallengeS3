import '@css/Client.css';
import ClientReview from "./ClientReview.jsx";
import { useParams } from 'react-router-dom';

function ClientProfile({client, getClient}) {
    const { id } = useParams();

    return (
        <div className="client-profile-card">
            <div className="client-profile-card__img">
                <img src="../../../src/assets/img/user-client.jpg" alt={client.auth.firstname}/>
            </div>
            <h2 className="client-profile-card__name">{client.auth.firstname}</h2>
            <div className="client-profile-card__note">
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="21" viewBox="0 0 23 21" fill="none">
                    <path d="M11.04 0L7.627 6.915L0 8.018L5.52 13.402L4.215 21L11.04 17.415L17.865 21L16.56 13.402L22.08 8.025L14.453 6.915L11.04 0Z" fill="var(--primary)"/>
                </svg>
                {
                    client.rating === 0
                        ? 'Pas de note'
                        : <p>{client.rating}</p>
                }
            </div>
            <ClientReview client={client} id={id} getClient={getClient}/>
        </div>
    )
}

export default ClientProfile;