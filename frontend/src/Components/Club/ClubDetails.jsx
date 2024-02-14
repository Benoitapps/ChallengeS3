import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getClubDetails } from '../../hook/clubs/getClub';
import '@css/Clubs.css';
import PopUp from "../Calendar/Popup.jsx";
import {patchPrestation} from "../../hook/manager/patchPrestation.js";

function ClubDetails({isCoach,isManager,isConnected,isAdmin,update}) {

    const { id } = useParams();
    const [club, setClub] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpenDetail, setIsModalOpenDetail] = useState(false);
    const [thePrestation, setThePrestation] = useState("");
    const [reload, setReload] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            const result = await getClubDetails(id);
            setClub(result);
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleClick = (prestation) => {
        setIsModalOpenDetail(true);
        setThePrestation(prestation);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await patchPrestation(thePrestation.id, e.target.name.value, e.target.description.value);
        setIsModalOpenDetail(false);
        setReload(!reload);

     }

    function closeModal() {
        setIsModalOpenDetail(false);
    }

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
                                <div className="city-zip">{club.address}, {club.city} - {club.zipCode}</div>
                            </div>
                            {isConnected&&isManager?<Link to={{
                                pathname: `/manager/addCoach/${id}`,
                                // state: { franchiseName: franchise.name }
                            }}>
                                <button>Ajouter un coach</button>
                            </Link>:null}
                            {isConnected&&isManager?<Link to={{
                                pathname: `/manager/addPrestation/${id}`,
                                // state: { franchiseName: franchise.name }
                            }}>
                                <button>Ajouter une prestation</button>
                            </Link>:null}
                            {isConnected && isManager &&
                            <div className="coach-list">
                                {

                                    club.coachs.length === 0
                                        ? 'Il n\'y a pas encore de coachs pour cette franchise.'
                                        :
                                        club.coachs.map((coach, index) => {
                                            return (
                                                <div className="coach-card" key={index}>
                                                    <div className="coach-name">{coach.auth.firstname} {coach.auth.lastname}</div>
                                                    <div className="coach-name">{coach.auth.email}</div>
                                                    <Link to={`/manager/coach/${coach.id}`} className="view-coach-button">
                                                        Voir coach
                                                    </Link>
                                                </div>
                                            )
                                        })
                                }
                            </div>
                            }
                            <div className="prestations">
                                {
                                    club.prestations.length === 0
                                    ? 'Il n\'y a pas encore de prestations pour cette franchise.'
                                    : club.prestations.map((prestation, index) => {
                                        return (
                                            <div className="prestation-card" key={index}>
                                                <div className="prestation-name">{prestation.name}</div>
                                                <div className="prestation-price">Prix : {prestation.price}€</div>
                                                {isManager && update?<button onClick={() =>handleClick(prestation)}>Modifier</button>:null}
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
                                                                        {isConnected&&!isManager&&!isCoach&&!isAdmin?<Link to={"/prestation/" + prestation.id + "/coach/" + coach.id + "/add"} className="view-coach-button">
                                                                            Réserver un créneau
                                                                        </Link>:null}
                                                                    </div>
                                                                )
                                                            })
                                                    }
                                                </div>
                                                <PopUp show={isModalOpenDetail}  onClose={() => closeModal()}
                                                       annuler={"Cancel"}>
                                                    {<div className="login-signup">

                                                        <span>Modifier la Prestation</span>

                                                        <form className="login-signup__form" onSubmit={handleSubmit}>
                                                            {
                                                                error && <p className="error">{error}</p>
                                                            }
                                                            <input type="text" id="name" name="name" placeholder="Libellé" defaultValue={thePrestation.name}></input>
                                                            <input type="text" id="description" name="description" placeholder="Description" defaultValue={thePrestation.price}></input>
                                                            <div className="login-signup__form__submit">
                                                                <input type="submit" value="Update" />
                                                            </div>
                                                        </form>
                                                    </div>}
                                                </PopUp>
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