import imageClient from '../../../src/assets/img/user-client.jpg';
import imageCoach from '../../../src/assets/img/user-coach.jpg';
import imageAdmin from '../../../src/assets/img/user-admin.jpg';
import imageManager from '../../../src/assets/img/user-manager.jpg';
import {useEffect, useState} from "react";

export default function ProfileCard({user, submitProfile, isLoading, isCoach, isManager, isAdmin}) {
    const [image, setImage] = useState('');
    const [firstname, setFirstname] = useState('');

    useEffect(() => {
        if (isCoach) {
            setImage(imageCoach);
        } else if (isManager) {
            setImage(imageManager);
        } else if (isAdmin) {
            setImage(imageAdmin);
        } else {
            setImage(imageClient);
        }

        if(isAdmin) {
            setFirstname(user.firstname);
        } else {
            setFirstname(user.auth.firstname);
        }
    }, []);

    return (
        <div className="profile-card">
            <div className="profile-card__img">
                <img src={image} alt={firstname}/>
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