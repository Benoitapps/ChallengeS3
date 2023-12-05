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

    const handleVerifCompany = async (companyId, verified) => {
        let result = await fetch('http://localhost:8888/api/companies/' + companyId, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/merge-patch+json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify({
                isVerified: !verified,
            }),
        });
        result = await result.json();
        if (!result) return alert('Erreur lors de la modification de la company');

        setCompanies(
            companies.map((company) => {
                if (company.id === companyId) {
                    company.isVerified = !verified;
                }
                return company;
            })
        );
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
                            <th>Vérifié</th>
                            <th>Manager id</th>
                            <th>Nom de la company</th>
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
                                    {
                                        company.isVerified 
                                        ? <button onClick={() => handleVerifCompany(company.id, company.isVerified)}>
                                            Réfuté
                                        </button>
                                        : <button onClick={() => handleVerifCompany(company.id, company.isVerified)}>
                                            Vérifier
                                        </button>
                                    }
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