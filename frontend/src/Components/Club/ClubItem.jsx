import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '@css/Home.css';

function ClubItem({ club }) {
    const [minPrice, setMinPrice] = useState(0);

    useEffect(() => {
        setMinPrice(getMinPricePrestations());
    }, [club]);

    const getMinPricePrestations = () => {
        let prixMinimum = club.prestations.reduce((minPrice, prestation) => {
            return (prestation.price < minPrice) ? prestation.price : minPrice;
        }, club.prestations[0].price);
        return prixMinimum;
    };

    let link = `/club/${club.id}`;

    const getImage = () => {
        if (club.image) {
            return club.image;
        }
        return 'https://picsum.photos/300/300';
    }

    return (
        <Link to={link} className="home-club-card">
            <div className="home-club-card__visuel">
                <img src={getImage()} alt="sport-image"/>
            </div>
            <div className="home-club-card__content">
                <div className="home-club-card__content__details">
                    <p className="home-club-card__content__details__prestation">
                        {club.prestations[0].name}
                    </p>
                    <h3 className="home-club-card__content__details__club">{club.name}</h3>
                    <p className="home-club-card__content__details__address">{club.address}, {club.city} {club.zip_code}</p>
                </div>
                {
                    minPrice >= 0 ? <p className="home-club-card__content__price">
                        <span>{minPrice}€</span> / séance
                    </p> : <p className="home-club-card__content__price">Pas de prestation</p>
                }
            </div>
        </Link>
    );
}

export default ClubItem;