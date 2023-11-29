import React, {useEffect, useState} from 'react';
import {getCompanies} from "../../hook/manager/company.js";

function Home() {
    const [companies, setCompanies] = useState([]);
    const [companiesLoading, setCompaniesLoading] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            setCompaniesLoading(true);

            let companies = await getCompanies();

            setCompanies(companies);
            setCompaniesLoading(false);
        };

        loadData();
    }, []);

    return (
        <main>
            {companiesLoading && <div>Chargement...</div>}
            <div>
                {companies.map((company) => (
                    <div key={company.id} style={{display: 'flex', justifyContent: 'space-evenly', textAlign: 'left'}}>
                        <span style={{width: '20%'}}>
                            {company.id}
                        </span>
                        <span style={{width: '20%'}}>
                            {company.name}
                        </span>
                        <span style={{width: '20%'}}>
                            {company.description}
                        </span>
                        <span style={{width: '20%'}}>
                            {company.kbis}
                        </span>
                        <span style={{width: '20%'}}>
                            {company.isVerified}
                        </span>
                        <span style={{width: '20%'}}>
                            {company.manager_id}
                        </span>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default Home;