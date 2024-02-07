import React, {useEffect, useState} from 'react';
import {getFranchises} from "../../hook/manager/franchise.js";
import {getCompanies} from "../../hook/manager/company.js";
import {Link} from "react-router-dom";
const env = import.meta.env;

function Home({ isManager, companyStatus, testState }) {
    const [franchises, setFranchises] = useState([]);
    const [franchisesLoading, setFranchisesLoading] = useState(false);
    const [hasCompany, setHasCompany] = useState(true);
    // const [companyStatus, setCompanyStatus] = useState('none');

    useEffect(() => {

        // const loadComapnies = async () => {
        //     let company = await getCompanies();
        // };
        // loadComapnies();
        // const checkCompany = async () => {
        //     let result = await fetch(`${env.VITE_URL_BACK}/api/companies/myCompany`, {
        //         method: 'GET',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             Authorization: `Bearer ${localStorage.getItem("token")}`,
        //         },
        //     });
        //     let body = await result.json();
        //     console.log(body);
        //
        //     if (!body.name) {
        //         console.log('no company');
        //         setHasCompany(false);
        //         const newStatus = 'none';
        //         console.log('newstatus', newStatus);
        //         setCompanyStatus(newStatus);
        //         console.log('state company status', companyStatus);
        //     } else {
        //         console.log('company found');
        //         if (body.isVerified === false) {
        //             console.log('company not verified');
        //             const newStatus = 'pending';
        //             setCompanyStatus(newStatus);
        //         } else {
        //             console.log('company verified');
        //             const newStatus = 'accepted';
        //             setCompanyStatus(newStatus);
        //         }
        //     }
        // };
        // checkCompany();
        const loadData = async () => {
            setFranchisesLoading(true);

            let franchises = await getFranchises();

            setFranchises(franchises);
            setFranchisesLoading(false);
        };

        // loadData();
    }, []);

    return (
        <main>
            {companyStatus === 'none' && (
                <div>
                            <p>Vous n'avez pas encore demandé la création de votre entreprise.</p>
                            <Link to="/manager/company">
                                <button>Ajouter mon entreprise</button>
                            </Link>
                        </div>
            )}
            {companyStatus === 'pending' && (
                <div>Votre entreprise est en attente de vérification.</div>
            )}
            {companyStatus === 'accepted' && (
                <>
                    <div>Votre entreprise a été vérifiée et acceptée.</div>
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
                        <span style={{width: '20%'}}>
                                    <Link to={{
                                        pathname: `/manager/addCoach/${franchise.id}`,
                                        state: { franchiseName: franchise.name }
                                    }}>
                                        <button>Ajouter un coach</button>
                                    </Link>
                                </span>
                    </div>
                ))}
            </div>
        </>
            )}
            {/*    <>*/}
            {/*        <h1>Mes franchises :</h1>*/}
            {/*        {franchisesLoading && <div>Chargement...</div>}*/}
            {/*        <div>*/}
            {/*            {franchises.map((franchise) => (*/}
            {/*                <div key={franchise.name} style={{display: 'flex', justifyContent: 'space-evenly', textAlign: 'left'}}>*/}
            {/*                    <span style={{width: '20%'}}>*/}
            {/*                        {franchise.name}*/}
            {/*                    </span>*/}
            {/*                    <span style={{width: '20%'}}>*/}
            {/*                        {franchise.description}*/}
            {/*                    </span>*/}
            {/*                    <span style={{width: '20%'}}>*/}
            {/*                        {franchise.address}*/}
            {/*                    </span>*/}
            {/*                    <span style={{width: '20%'}}>*/}
            {/*                        {franchise.city}*/}
            {/*                    </span>*/}
            {/*                    <span style={{width: '20%'}}>*/}
            {/*                        {franchise.zipCode}*/}
            {/*                    </span>*/}
            {/*                    <span style={{width: '20%'}}>*/}
            {/*                        /!* <Link to={`/manager/addCoach/${franchise.id}`}>*/}
            {/*                            <button>Ajouter un coach</button>*/}
            {/*                        </Link> *!/*/}
            {/*                        <Link to={{*/}
            {/*                            pathname: `/manager/addCoach/${franchise.id}`,*/}
            {/*                            state: { franchiseName: franchise.name }*/}
            {/*                        }}>*/}
            {/*                            <button>Ajouter un coach</button>*/}
            {/*                        </Link>*/}
            {/*                    </span>*/}
            {/*                </div>*/}
            {/*            ))}*/}
            {/*        </div>*/}
            {/*    </>*/}
            {/*) : (*/}
            {/*    <div>*/}
            {/*        <p>Vous n'avez pas encore demandé la création de votre entreprise.</p>*/}
            {/*        <Link to="/manager/company">*/}
            {/*            <button>Ajouter mon entreprise</button>*/}
            {/*        </Link>*/}
            {/*    </div>*/}
            {/*)}*/}
        </main>
    );
}

export default Home;