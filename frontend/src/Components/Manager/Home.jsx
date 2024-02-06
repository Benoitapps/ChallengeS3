import React, {useEffect, useState} from 'react';
import {getFranchises} from "../../hook/manager/franchise.js";
import {Link} from "react-router-dom";
import ClubItem from "../Club/ClubItem.jsx";
import PrestaManagerItem from "./PrestaManagerItem.jsx";

function Home() {
    const [franchises, setFranchises] = useState([]);
    const [franchisesLoading, setFranchisesLoading] = useState(false);
    const [hasCompany, setHasCompany] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            setFranchisesLoading(true);

            let franchises = await getFranchises();

            setFranchises(franchises);
            setFranchisesLoading(false);
        };

        loadData();
    }, [loading]);

    const reload = async () => {
        setLoading(!loading)
    }


    return (
        <main>
            {/*<div style={{width: '50%'}}>*/}
            {hasCompany ? (
                <>
                    <h1>Mes franchises :</h1>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {franchisesLoading && <div>Chargement...</div>}
                    <div>
                        {franchises.map((franchise, index) => (
                            <PrestaManagerItem club={franchise} key={index} reload={reload}/>
                        ))}
                    </div>
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
            {/*</div>*/}
        </main>
    );
}

export default Home;