import React, { useEffect, useState } from 'react';
import { getCompanies } from '../../hook/admin/company';

function CompaniesList() {
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

    const handleVerifCompany = async (companyId) => {
        console.log('Vérification de la société');
        // TODO: to implement
        // let result = await fetch('http://localhost:8000/api/admin/company/verify', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': 'Bearer ' + localStorage.getItem('token'),
        //     },
        //     body: JSON.stringify({
        //         companyId
        //     }),
        // });

        // result = await result.json();

        // console.log(result)
    };

    return (
        <main>
            {companiesLoading 
                ? <div>Chargement...</div> 
                : 
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Is verified</th>
                            <th>Manager id</th>
                            <th>Name</th>
                            <th>Description</th>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {companies.map((company) => (
                            <tr key={company.id}>
                                <td>{company.id}</td>
                                <td>{company.isVerified ? 'Oui' : 'Non'}</td>
                                <td>{company.manager}</td>
                                <td>{company.name}</td>
                                <td style={{width: '20%'}}>{company.description}</td>
                                <td>
                                    <button onClick={() => handleVerifCompany(company.id)}>
                                        Vérifier
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </main>
    );
}

export default CompaniesList;