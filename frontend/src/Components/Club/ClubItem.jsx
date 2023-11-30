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
        <div style={{display: 'flex', borderRadius: '10px', background: '#c4ceeb', margin: '15px', boxShadow: '0px 0px 8px -3px rgba(0,0,0,0.26)'}}>
            <img src="https://picsum.photos/300/300" alt="sport-image" style={{width: '50%', height: '100%', maxHeight: '200px', borderRadius: '10px 0 0 10px', objectFit: 'cover'}} />
            <div style={{width: '50%', textAlign: 'left', display: 'flex', alignItems: 'stretch', flexDirection: 'column', justifyContent: 'space-between', padding: '10px'}}>
                <div>
                    <div style={{fontSize: '19px', fontWeight: '600'}}>{club.name}</div>
                    {/* <div>{club.company.name}</div>
                    <div>{club.description}</div> */}
                    <div style={{display: 'flex', color: '#7b7b7b'}}>
                        <div style={{marginRight: '5px'}}>{club.address},</div>
                        <div style={{marginRight: '5px'}}>{club.city}</div>
                        <div>{club.zip_code}</div>
                    </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    {
                        minPrice ? <div>A partir de <span style={{color: '#2970FF', fontSize: '19px', fontWeight: '600'}}>{minPrice}€</span> / prestation</div> : <div>Pas de prestation</div>
                    }
                    <Link to={link}>
                        <button>Voir plus</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ClubItem;