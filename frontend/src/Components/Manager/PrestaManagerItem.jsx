import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PopUp from "../Calendar/Popup.jsx";
import {patchCompany} from "../../hook/manager/patchCompany.js";

function PrestaManagerItem({ club,reload }) {

    const [isModalOpenDetail, setIsModalOpenDetail] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [error, setError] = useState(null);


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
        <div style={{display: 'flex' ,width:'50em', borderRadius: '10px', background: '#c4ceeb', margin: '15px', boxShadow: '0px 0px 8px -3px rgba(0,0,0,0.26)'}}>
            <img src={getImage()} alt="sport-image" style={{width: '50%', height: '100%', maxHeight: '200px', borderRadius: '10px 0 0 10px', objectFit: 'cover'}} />
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
                    <div><p>Lat</p>{club.lat}</div>
                    <div><p>Lng</p>{club.lng}</div>
                </div>
                    <button style={{ backgroundColor: 'green' }} onClick={() =>handleClick(club)}>Modifier</button>

                    <Link to={`club/${club.id}`}>
                        <button>Voir Franchise</button>
                    </Link>
            </div>
            <PopUp show={isModalOpenDetail}  onClose={() => closeModal()}
                   annuler={"Cancel"}>
                {<div className="login-signup">

                    <span>Modifier la franchise</span>

                    <form className="login-signup__form" onSubmit={handleSubmit}>
                        {
                            error && <p className="error">{error}</p>
                        }
                        <input type="text" id="name" name="name" placeholder="Libellé" defaultValue={club.name}></input>
                        <input type="text" id="description" name="description" placeholder="Description" defaultValue={club.description}></input>
                        <input type="text" id="address" name="address" placeholder="Adresse" defaultValue={club.address}></input>
                        <input type="text" id="city" name="city" placeholder="Ville" defaultValue={club.city}></input>
                        <input type="number" id="zip_code" name="zip_code" placeholder="Code postal" defaultValue={club.zipCode}></input>
                        <input type="number" id="lng" name="lng" placeholder="lng" defaultValue={club.lng}></input>
                        <input type="number" id="lat" name="lat" placeholder="lat" defaultValue={club.lat}></input>
                        <div className="login-signup__form__submit">
                            <input type="submit" value="Update" />
                        </div>
                    </form>
                </div>}
            </PopUp>
        </div>

    );
}

export default PrestaManagerItem;