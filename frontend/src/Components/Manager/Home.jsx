import {useEffect, useState} from 'react';
import {getFranchises} from "../../hook/manager/franchise.js";
import {getCompanies} from "../../hook/manager/company.js";
import {Link} from "react-router-dom";
import PrestaManagerItem from "./PrestaManagerItem.jsx";
import {useTranslation} from "react-i18next";
const env = import.meta.env;

function Home({ isManager, companyStatus }) {
    const [franchises, setFranchises] = useState([]);
    const [franchisesLoading, setFranchisesLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();

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
                                <div key={franchise.id}>
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
                                            <div key={coach.id} style={{ marginBottom: '20px' }}>
                                                <p>Nom : {coach.auth.firstname} {coach.auth.lastname}</p>
                                                <p>Email : {coach.auth.email}</p>
                                                <Link to={`/manager/coach/${coach.id}`}>
                                                    <p>Voir le coach</p>
                                                </Link>
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
                                            <div key={prestation.id} style={{ marginBottom: '20px' }}>
                                                <p>Libellé : {prestation.name}</p>
                                                <p>Prix : {prestation.price} €</p>
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
//     return branche dev
//     return (
//         <main>
//             {/*<div style={{width: '50%'}}>*/}
//             {hasCompany ? (
//                 <>
//                     <h1>{t('MyFranchises')} :</h1>
//                     <div style={{ width: '100%', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px', marginTop: '20px'}}>
//                         {franchisesLoading && <div>{t('Loading')}...</div>}
//                         {franchises.map((franchise, index) => (
//                             <PrestaManagerItem club={franchise} key={index} reload={reload}/>
//                         ))}
//                     </div>
//                 </>
//             ) : (
//                 <div>
//                     <p>{t('CompanyNotApplied')}</p>
//                     <Link to="/manager/company">
//                         <button>{t('AddCompany')}</button>
//                     </Link>
//                 </div>
//             )}
//             {/*</div>*/}
//         </main>
//     );
}

export default Home;