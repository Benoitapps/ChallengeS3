import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getClubDetails } from '../../hook/clubs/getClub';
import '@css/Clubs.css';

function ClubDetails() {
    const { id } = useParams();
    const [club, setClub] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getClubDetails(id);
            console.log(result)
            setClub(result);
            setLoading(false);
        };
        fetchData();
    }, []);

    return (
        <main>
            {
                loading
                    ? <div className="loading">Chargement...</div>
                    :
                    <div className="container-club">
                        <div className="club-card">
                            <div className="club-name">{club.name}</div>
                            <div className="company-name">{club.company.name}</div>
                            <div className="description">{club.description}</div>
                            <div className="address">
                                <div className="city-zip">{club.address}, {club.city} - {club.zip_code}</div>
                            </div>
                            <div className="prestations">
                                {
                                    club.prestations.map((prestation, index) => {
                                        return (
                                            <div className="prestation-card" key={index}>
                                                <div className="prestation-name">{prestation.name}</div>
                                                <div className="prestation-price">Prix : {prestation.price}€</div>
                                                <div className="coach-list">
                                                    {
                                                        prestation.coach.length === 0
                                                            ? 'Pas de coach disponible'
                                                            :
                                                            prestation.coach.map((coach, index) => {
                                                                return (
                                                                    <div className="coach-card" key={index}>
                                                                        <div className="coach-name">{coach.auth.firstname} {coach.auth.lastname}</div>
                                                                        <Link to={"/coach/" + coach.id} className="view-coach-button">
                                                                            Voir coach
                                                                        </Link>
                                                                        <Link to={"/prestation/" + prestation.id + "/coach/" + coach.id + "/add"} className="view-coach-button">
                                                                            Réserver un créneau
                                                                        </Link>
                                                                    </div>
                                                                )
                                                            })
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
            }
        </main>
    );
}

export default ClubDetails;