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
                    ? <div class="loading">Chargement...</div>
                    :
                    <div class="container-club">
                        <div class="club-card">
                            <div class="club-name">{club.name}</div>
                            <div class="company-name">{club.company.name}</div>
                            <div class="description">{club.description}</div>
                            <div class="address">
                                <div class="city-zip">{club.address}, {club.city} - {club.zip_code}</div>
                            </div>
                            <div class="prestations">
                                {
                                    club.prestations.map((prestation, index) => {
                                        return (
                                            <div class="prestation-card" key={index}>
                                                <div class="prestation-name">{prestation.name}</div>
                                                <div class="prestation-price">Prix : {prestation.price}€</div>
                                                <div class="coach-list">
                                                    {
                                                        prestation.coach.length === 0
                                                            ? 'Pas de coach disponible'
                                                            :
                                                            prestation.coach.map((coach, index) => {
                                                                return (
                                                                    <div class="coach-card" key={index}>
                                                                        <div class="coach-name">{coach.auth.firstname} {coach.auth.lastname}</div>
                                                                        <Link to={"/prestation/" + prestation.id + "/coach/" + coach.id} class="view-coach-button">
                                                                            Voir coach
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