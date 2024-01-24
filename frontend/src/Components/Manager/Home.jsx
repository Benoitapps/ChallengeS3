import React, {useEffect, useState} from 'react';
import {getFranchises} from "../../hook/manager/franchise.js";
import {Link} from "react-router-dom";

function Home() {
    const [franchises, setFranchises] = useState([]);
    const [franchisesLoading, setFranchisesLoading] = useState(false);
    const [hasCompany, setHasCompany] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setFranchisesLoading(true);

            let franchises = await getFranchises();

            setFranchises(franchises);
            setFranchisesLoading(false);
        };

        loadData();
    }, []);

    return (
        <main>
            {hasCompany ? (
                <>
                    <h1>Mes franchises :</h1>
                    {franchisesLoading && <div>Chargement...</div>}
                    <div>
                        {franchises.map((franchise) => (
                            <div key={franchise.name} style={{display: 'flex', justifyContent: 'space-evenly', textAlign: 'left'}}>
                                <span style={{width: '20%'}}>
                                    {franchise.name}
                                </span>
                                <span style={{width: '20%'}}>
                                    {franchise.description}
                                </span>
                                <span style={{width: '20%'}}>
                                    {franchise.address}
                                </span>
                                <span style={{width: '20%'}}>
                                    {franchise.city}
                                </span>
                                <span style={{width: '20%'}}>
                                    {franchise.zipCode}
                                </span>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div>
                    <p>Vous n'avez pas encore demandé la création de votre entreprise.</p>
                    <Link to="/manager/company">
                        <button>Ajouter mon entreprise</button>
                    </Link>
                </div>
            )}
        </main>
    );
}

export default Home;