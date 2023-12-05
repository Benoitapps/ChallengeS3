import React, {useEffect, useState} from 'react';
import {getCompanies} from "../../hook/manager/company.js";
import {getFranchises} from "../../hook/manager/franchise.js";

function Home() {
    const [companies, setCompanies] = useState([]);
    const [companiesLoading, setCompaniesLoading] = useState(false);
    const [franchises, setFranchises] = useState([]);
    const [franchisesLoading, setFranchisesLoading] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            // setCompaniesLoading(true);
            //
            // let companies = await getCompanies();
            //
            // setCompanies(companies);
            // setCompaniesLoading(false);

            setFranchisesLoading(true);

            let franchises = await getFranchises();

            setFranchises(franchises);
            setFranchisesLoading(false);
        };

        loadData();
    }, []);

    return (
        <main>
            {/*<h1>Mon entreprise :</h1>*/}
            {/*{companiesLoading && <div>Chargement...</div>}*/}
            {/*<div>*/}
            {/*    {companies.map((company) => (*/}
            {/*        <div key={company.id} style={{display: 'flex', justifyContent: 'space-evenly', textAlign: 'left'}}>*/}
            {/*            <span style={{width: '20%'}}>*/}
            {/*                {company.id}*/}
            {/*            </span>*/}
            {/*            <span style={{width: '20%'}}>*/}
            {/*                {company.name}*/}
            {/*            </span>*/}
            {/*            <span style={{width: '20%'}}>*/}
            {/*                {company.description}*/}
            {/*            </span>*/}
            {/*            <span style={{width: '20%'}}>*/}
            {/*                {company.kbis}*/}
            {/*            </span>*/}
            {/*            <span style={{width: '20%'}}>*/}
            {/*                {company.isVerified}*/}
            {/*            </span>*/}
            {/*            <span style={{width: '20%'}}>*/}
            {/*                {company.manager_id}*/}
            {/*            </span>*/}
            {/*        </div>*/}
            {/*    ))}*/}
            {/*</div>*/}
            <h1>Mes franchises :</h1>
            {franchisesLoading && <div>Chargement...</div>}
            <div>
                {franchises.map((franchise) => (
                    <div key={franchise.id} style={{display: 'flex', justifyContent: 'space-evenly', textAlign: 'left'}}>
                        <span style={{width: '20%'}}>
                            {franchise.id}
                        </span>
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
        </main>
    );
}

export default Home;