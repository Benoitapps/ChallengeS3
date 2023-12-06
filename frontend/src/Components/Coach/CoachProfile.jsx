import '@css/Coach.css';

function CoachProfile({coach}) {
    return (
        <div className="coach-profile-card">
            <div className="coach-profile-card__img">
                <img src="https://thispersondoesnotexist.com/" alt={coach.firstname}/>
            </div>
            <h2 className="coach-profile-card__name">{coach.auth.firstname}</h2>
            <div className="coach-profile-card__note">
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="21" viewBox="0 0 23 21" fill="none">
                    <path d="M11.04 0L7.627 6.915L0 8.018L5.52 13.402L4.215 21L11.04 17.415L17.865 21L16.56 13.402L22.08 8.025L14.453 6.915L11.04 0Z" fill="var(--primary)"/>
                </svg>
                {
                    coach.rating === 0
                        ? 'Pas de note'
                        : <p>{coach.rating}</p>
                }
            </div>
        </div>
    )
}

export default CoachProfile;