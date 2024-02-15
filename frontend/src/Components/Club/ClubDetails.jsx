import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getClubDetails } from '../../hook/clubs/getClub';
import '@css/Clubs.css';
import PopUp from "../Calendar/Popup.jsx";
import {patchPrestation} from "../../hook/manager/patchPrestation.js";
import {useTranslation} from "react-i18next";

function ClubDetails({isCoach,isManager,isConnected,isAdmin,update}) {

    const { id } = useParams();
    const [club, setClub] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpenDetail, setIsModalOpenDetail] = useState(false);
    const [thePrestation, setThePrestation] = useState("");
    const [reload, setReload] = useState(false);
    const {t} = useTranslation();

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
                    ? <div className="loading">{t('Loading')}...</div>
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
                            }}>
                                <button>{t('AddCoach')}</button>
                            </Link>:null}
                            {isConnected&&isManager?<Link to={{
                                pathname: `/manager/addPrestation/${id}`,
                            }}>
                                <button>{t('AddService')}</button>
                            </Link>:null}
                            {isConnected && isManager &&
                            <div className="coach-list">
                                {
                                    club.coachs.length === 0
                                        ? <p>{t('NoCoachForThisService')}</p>
                                        :
                                        club.coachs.map((coach, index) => {
                                            return (
                                                <div className="coach-card" key={index}>
                                                    <div className="coach-name">{coach.auth.firstname} {coach.auth.lastname}</div>
                                                    <div className="coach-name">{coach.auth.email}</div>
                                                    <Link to={`/manager/coach/${coach.id}`} className="view-coach-button">
                                                        {t('UpdateCoach')}
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
                                        ? <p>{t('NoServiceForThisFranchise')}</p>
                                    : club.prestations.map((prestation, index) => {
                                        return (
                                            <div className="prestation-card" key={index}>
                                                <div className="prestation-name">{prestation.name}</div>
                                                <div className="prestation-price">{t('Price')} : {prestation.price}€</div>
                                                {isManager && update?<button onClick={() =>handleClick(prestation)}>{t('Update')}</button>:null}
                                                <div className="coach-list">
                                                    {
                                                        prestation.coach.length === 0
                                                            ? <p>{t('NoCoachAvailable')}</p>
                                                            :
                                                            prestation.coach.map((coach, index) => {
                                                                return (
                                                                    <div className="coach-card" key={index}>
                                                                        <div className="coach-name">{coach.auth.firstname} {coach.auth.lastname}</div>
                                                                        <Link to={"/coach/" + coach.id} className="view-coach-button">
                                                                            {t('ViewCoach')}
                                                                        </Link>
                                                                        {isConnected&&!isManager&&!isCoach&&!isAdmin?<Link to={"/prestation/" + prestation.id + "/coach/" + coach.id + "/add"} className="view-coach-button">
                                                                            {t('BookASlot')}
                                                                        </Link>:null}
                                                                    </div>
                                                                )
                                                            })
                                                    }
                                                </div>
                                                <PopUp show={isModalOpenDetail}  onClose={() => closeModal()}
                                                       annuler={t("Cancel")}>
                                                    {<div className="login-signup">

                                                        <span>{t('UpdateService')}</span>

                                                        <form className="login-signup__form" onSubmit={handleSubmit}>
                                                            {
                                                                error && <p className="error">{error}</p>
                                                            }
                                                            <input type="text" id="name" name="name" placeholder={t('CompanyName')} defaultValue={thePrestation.name}></input>
                                                            <input type="text" id="description" name="description" placeholder="Description" defaultValue={thePrestation.price}></input>
                                                            <div className="login-signup__form__submit">
                                                                <input type="submit" value={t('Update')} />
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