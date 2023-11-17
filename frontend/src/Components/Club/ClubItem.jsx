import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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

    return (
        <div style={{border: '1px solid black', display: 'flex'}}>
            <img src="https://picsum.photos/50/50" alt="sport-image" style={{width: '50%', height: '150px'}}  />
            <div style={{width: '50%'}}>
                <div>{club.name}</div>
                <div>{club.company.name}</div>
                <div>{club.description}</div>
                <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                    <div>{club.address}</div>
                    <div>{club.city}</div>
                    <div>{club.zip_code}</div>
                </div>
                <div>Prestation à partir de {minPrice}€</div>
                <div>
                    Les prestations : 
                    {
                        club.prestations.map((prestation, index) => {
                            return (
                                <div key={index}>
                                    <div>{prestation.name}</div>
                                </div>
                            )
                        })
                    }
                </div>
                <Link to={link}>
                    <button>En savoir plus</button>
                </Link>
            </div>
        </div>
    );
}

export default ClubItem;