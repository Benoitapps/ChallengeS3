import React, { useEffect, useState } from 'react';

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

    return (
        <div style={{border: '1px solid black', display: 'flex'}}>
            <img src="https://picsum.photos/50/50" alt="sport-image" style={{width: '50%', height: '150px'}}  />
            <div style={{width: '50%'}}>
                <div>{club.address}</div>
                <div>{club.city}</div>
                <div>{club.company.name}</div>
                <div>{club.description}</div>
                <div>{club.name}</div>
                <div>{club.zip_code}</div>
                Prestation à partir de {minPrice}€
            </div>
        </div>
    );
}

export default ClubItem;