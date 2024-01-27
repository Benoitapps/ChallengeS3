import React, { useEffect, useState } from 'react';
import { getCompanies } from '../../hook/admin/company';
const env = import.meta.env;

function CompaniesList() {
    const [companies, setCompanies] = useState([]);
    const [companiesLoading, setCompaniesLoading] = useState(false);

    const [beingEdited, setBeingEdited] = useState(false);
    const [currentCompanyId, setCurrentCompanyId] = useState(null);

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
        setCompaniesLoading(true);

        let result = await fetch(`${env.VITE_URL_BACK}/api/companies/` + companyId, {
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
        setCompaniesLoading(false);
    };

    const onEdit = (companyId) => {
        setBeingEdited(!beingEdited);
        setCurrentCompanyId(companyId);
    };

    const onSave = async (companyId) => {
        setCompaniesLoading(true);

        let companyInputs = document.querySelectorAll(`input[name="name"], textarea[name="description"]`);
        let company = {};
        companyInputs.forEach(input => company[input.name] = input.value);

        let result = await fetch(`${env.VITE_URL_BACK}/api/companies/` + companyId, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/merge-patch+json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify(company),
        });
        result = await result.json();
        
        if (!result) return alert('Erreur lors de la modification de la company');

        let companyIndex = companies.findIndex(company => company.id === companyId);
        companies[companyIndex].name = company.name;
        companies[companyIndex].description = company.description;

        setCompanies([...companies])

        setCompaniesLoading(false);
        setBeingEdited(!beingEdited);
        setCurrentCompanyId(null);
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
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {companies.map((company) => (
                            <tr key={company.id}>
                                <td>{company.id}</td>
                                <td style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                    <input type="checkbox" name="verified" id="verified" checked={company.isVerified} disabled/>
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
                                <td>{company.manager}</td>
                                <td>
                                    {
                                        beingEdited && currentCompanyId === company.id
                                            ? <input type="text" name="name" defaultValue={company.name} />
                                            : company.name
                                    }
                                </td>
                                <td style={{width: '20%'}}>
                                    {
                                        beingEdited && currentCompanyId === company.id
                                        ? <textarea type="text" name="description" defaultValue={company.description} />
                                        : company.description
                                    }
                                </td>
                                <td>
                                    {
                                        beingEdited && currentCompanyId === company.id
                                            ? <button onClick={() => onSave(company.id)}>
                                                Enregistrer
                                            </button>
                                            : <button onClick={() => onEdit(company.id)}>
                                                Modifier
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