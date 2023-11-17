import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getClubDetails } from '../../hook/clubs/getClub';


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
                ? <div>Chargement...</div> 
                : 
                <div>
                    <div>{club.name}</div>
                    <div>{club.company.name}</div>
                    <div>{club.description}</div>
                    <div>
                        <div>{club.address}</div>
                        <div>{club.city}</div>
                        <div>{club.zip_code}</div>
                    </div>
                    <div>
                        Les prestations : 
                        {
                            club.prestations.map((prestation, index) => {
                                return (
                                    <div key={index}>
                                        <div>
                                            {prestation.name} sont prix est de : {prestation.price}€ avec le(s) coach(s) 
                                            { 
                                                prestation.coach.length === 0 
                                                ? ' pas de coach disponible'
                                                :
                                                prestation.coach.map((coach, index) => {
                                                    return (
                                                        <div key={index}>
                                                            <div>
                                                                {coach.auth.firstname} {coach.auth.lastname}
                                                            </div>
                                                            <Link to='/'>
                                                                <button>voir coach</button>
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
            }
        </main>
    );
}

export default ClubDetails;