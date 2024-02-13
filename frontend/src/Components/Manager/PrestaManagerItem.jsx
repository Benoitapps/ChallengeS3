import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PopUp from "../Calendar/Popup.jsx";
import {patchCompany} from "../../hook/manager/patchCompany.js";
import '@css/Franchises.css';
import { useTranslation } from 'react-i18next';

function PrestaManagerItem({ club,reload }) {

    const [isModalOpenDetail, setIsModalOpenDetail] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [error, setError] = useState(null);
    const { t } = useTranslation();
    let link = `/home/club/:id/${club.id}`;

    const getImage = () => {
        if (club.image) {
            return club.image;
        }
        return 'https://picsum.photos/300/300';
    }

    const handleClick = (club) => {
        setIsModalOpenDetail(true);
    }

    function closeModal() {
        setIsModalOpenDetail(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await patchCompany(club.id, e.target.name.value, e.target.description.value, e.target.address.value, e.target.city.value, e.target.zip_code.value, e.target.lng.value, e.target.lat.value);
        setIsModalOpenDetail(false);
        reload();
    }

    return (
        <div className="franchise-card">
            <Link to={`club/${club.id}`} title={t('SeeTheClub')} className="franchise-card__visuel">
                <img src={getImage()} alt="sport-image"/>
            </Link>
            <div className="franchise-card__content">
                <Link to={`club/${club.id}`} title={t('SeeTheClub')} className="franchise-card__content__details">
                    <div className="franchise-card__content__details__prestations">
                        {club.prestations.map((prestation, index) => (
                            <p className="franchise-card__content__details__prestations__prestation" key={index}>{prestation.name}</p>
                        ))}
                    </div>
                    <h3 className="franchise-card__content__details__club">{club.name}</h3>
                    <p className="franchise-card__content__details__address">{club.address}, {club.city} {club.zip_code}</p>
                    {/*<p className="franchise-card__content__details__lat-lng"><span>Lat</span> {club.lat}</p>*/}
                    {/*<p className="franchise-card__content__details__lat-lng"><span>Lng</span> {club.lng}</p>*/}
                </Link>
                <button className="primary-button" onClick={() => handleClick(club)}>{t('Update')}</button>
            </div>
            <PopUp show={isModalOpenDetail} onClose={() => closeModal()}
                   annuler={t("Cancel")}>
                {<div className="login-signup">

                    <p className="form-title">{t('UpdateFranchise')}</p>

                    <form className="login-signup__form" onSubmit={handleSubmit}>
                        {
                            error && <p className="error">{error}</p>
                        }
                        <input type="text" id="name" name="name" placeholder="Libellé" defaultValue={club.name}></input>
                        <input type="text" id="description" name="description" placeholder="Description"
                               defaultValue={club.description}></input>
                        <input type="text" id="address" name="address" placeholder="Adresse"
                               defaultValue={club.address}></input>
                        <input type="text" id="city" name="city" placeholder="Ville" defaultValue={club.city}></input>
                        <input type="number" id="zip_code" name="zip_code" placeholder="Code postal"
                               defaultValue={club.zipCode}></input>
                        <input type="number" id="lng" name="lng" placeholder="lng" defaultValue={club.lng}></input>
                        <input type="number" id="lat" name="lat" placeholder="lat" defaultValue={club.lat}></input>
                        <div className="login-signup__form__submit">
                            <input type="submit" value={t('Update')}/>
                        </div>
                    </form>
                </div>}
            </PopUp>
        </div>

    );
}

export default PrestaManagerItem;