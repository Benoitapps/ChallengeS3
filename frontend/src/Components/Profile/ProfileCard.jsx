export default function ProfileCard({user, submitProfile, isLoading}) {

    return (
        <div className="profile-card">
            <div className="profile-card__img">
                <img src="https://thispersondoesnotexist.com/" alt={user.auth.firstname}/>
            </div>
            <button className="profile-card__submit primary-button" type="submit" onClick={submitProfile}>
                {
                    isLoading
                        ? 'En cours de sauvegarde...'
                        : 'Sauvegarder'
                }
            </button>
        </div>
    );
}