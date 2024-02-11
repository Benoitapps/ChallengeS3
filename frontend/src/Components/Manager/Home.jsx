import React, {useEffect, useState} from 'react';
import {getFranchises} from "../../hook/manager/franchise.js";
import {getCompanies} from "../../hook/manager/company.js";
import {Link} from "react-router-dom";
import ClubItem from "../Club/ClubItem.jsx";
import PrestaManagerItem from "./PrestaManagerItem.jsx";
const env = import.meta.env;

function Home({ isManager, companyStatus }) {
    const [franchises, setFranchises] = useState([]);
    const [franchisesLoading, setFranchisesLoading] = useState(false);
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


    // branche addCoach
    return (
        <main>
            {companyStatus === 'accepted' && (
            <>
                {/* <div>Votre entreprise a été vérifiée et acceptée.</div> */}
                <h1>Mes franchises :</h1>
                {franchisesLoading ? (
                    <div>Chargement...</div>
                ) : (
                    franchises.length === 0 ? (
                        <div>
                            Vous n'avez pas encore de franchises.<br/>
                            <Link to="/manager/franchise"> Cliquez ici pour ajouter votre 1ère franchise</Link>
                        </div>
                    ) : (
                        <div>
                            {franchises.map((franchise) => (
                                <div key={franchise.name}>
                                    <h2>{franchise.name}</h2>
                                    <p>{franchise.description}</p>
                                    <p>{franchise.address}</p>
                                    <p>{franchise.city}</p>
                                    <p>{franchise.zipCode}</p>
                                    <h3>Coachs :</h3>
                                    {franchise.coachs.length === 0 ? (
                                        <div>Il n'y a pas encore de coachs pour cette franchise.</div>
                                    ) : (
                                        franchise.coachs.map((coach) => (
                                            <div key={coach.auth.email} style={{ marginBottom: '20px' }}>
                                                <p>Nom : {coach.auth.firstname} {coach.auth.lastname}</p>
                                                <p>Email : {coach.auth.email}</p>
                                            </div>
                                        ))
                                    )}
                                    <Link to={{
                                        pathname: `/manager/addCoach/${franchise.id}`,
                                        state: { franchiseName: franchise.name }
                                    }}>
                                        <button>Ajouter un coach</button>
                                    </Link>
                                    <h3>Prestations :</h3>
                                    {franchise.prestations.length === 0 ? (
                                        <div>Il n'y a pas encore de prestations pour cette franchise.</div>
                                    ) : (
                                        franchise.prestations.map((prestation) => (
                                            <div key={prestation.id}>
                                                <p>Nom : {prestation.name}</p>
                                            </div>
                                        ))
                                    )}
                                    <Link to={{
                                        pathname: `/manager/addPrestation/${franchise.id}`,
                                        state: { franchiseName: franchise.name }
                                    }}>
                                        <button>Ajouter une prestation</button>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )
                )}
            </>
            )}
        </main>
    );

//     branche dev
//     return (
//         <main>
//             {/*<div style={{width: '50%'}}>*/}
//             {hasCompany ? (
//                 <>
//                     <h1>Mes franchises :</h1>
//                     <div style={{ width: '100%', display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
//                         {franchisesLoading && <div>Chargement...</div>}
//                         <div>
//                             {franchises.map((franchise, index) => (
//                                 <PrestaManagerItem club={franchise} key={index} reload={reload}/>
//                             ))}
//                         </div>
//                     </div>
//                 </>
//             ) : (
//                 <div>
//                     <p>Vous n'avez pas encore demandé la création de votre entreprise.</p>
//                     <Link to="/manager/company">
//                         <button>Ajouter mon entreprise</button>
//                     </Link>
//                 </div>
//             )}
//             {/*</div>*/}
//         </main>
//     );
}

export default Home;