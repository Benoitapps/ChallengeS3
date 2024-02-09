import React, { useEffect, useState } from 'react';
import { getCompanies, getManagers } from '../../hook/admin/company';
import Popup from "../Calendar/Popup.jsx";
import GetPdf from "../GetPdf.jsx";
const env = import.meta.env;

function CompaniesList() {
    const [companies, setCompanies] = useState([]);
    const [companiesLoading, setCompaniesLoading] = useState(false);
    const [statePopUp, setStatePopUp] = useState(false);

    const [beingEdited, setBeingEdited] = useState(false);
    const [currentCompanyId, setCurrentCompanyId] = useState(null);

    const [managers, setManagers] = useState([]);
    const[kbis, setKbis] = useState(null)

    useEffect(() => {
        const loadData = async () => {
            setCompaniesLoading(true);

            let companies = await getCompanies();
            console.log(companies)
            setCompanies(companies);
            setCompaniesLoading(false);

            let managers = await getManagers();
            setManagers(managers);
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

    const addCompany = async () => {
        setCompaniesLoading(true);

        let companyInputs = document.querySelectorAll(`#company-form input[name="name"], #company-form textarea[id="company-description"]`);
        let company = {};
        companyInputs.forEach(input => company[input.name] = input.value);
        let manager = document.querySelector('#company-form select[id="company-manager"]');
        company.manager = "api/managers/" + manager.value;
        let kbis = document.querySelector('#company-form input[name="kbis"]');
        company.kbis = kbis.value;
        company.isVerified = false;

        let result = await fetch(`${env.VITE_URL_BACK}/api/companies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify(company),
        });
        result = await result.json();
        
        if (!result) return alert('Erreur lors de la création de la company');

        // Clear all inputs
        companyInputs.forEach(input => input.value = '');
        manager.value = '';
        kbis.value = '';

        setCompaniesLoading(false);
    };

   const handlePopup = (getKbis) => {
         setStatePopUp(true);
         setKbis(getKbis)
   }

    return (
        <main>
            {
                managers.length > 0 
                &&
                <div id='company-form' style={{display: 'flex', justifyContent: 'start', alignContent: 'center'}}>
                    <div style={{display: 'flex', justifyContent: 'start', alignContent: 'center', flexDirection: 'column',}}>
                        Manager a associer
                        <select name="manager" id="company-manager">
                            {
                                managers.map((manager) => (
                                    <option value={manager.id} key={manager.id}>
                                        {manager.auth.firstname + " - " + manager.auth.lastname}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'start', alignContent: 'center', flexDirection: 'column',}}>
                        Nom de la company
                        <input type="text" placeholder='nom de la company' name="name"/>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'start', alignContent: 'center', flexDirection: 'column',}}>
                        KBIS
                        <input type="text" placeholder='KBIS de la company' name="kbis"/>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'start', alignContent: 'center', flexDirection: 'column',}}>
                        Description
                        <textarea name="description" id="company-description" cols="20" rows="2"></textarea>
                    </div>
                    <button onClick={() => addCompany()}>
                        Ajouter
                    </button>
                </div>
            }
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
                            <th>KBIS</th>
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
                                <td>
                                    {<button onClick={() => handlePopup(company.kbis)}>
                                        ViewKBIS
                                    </button>}
                                        <Popup show={statePopUp} onClose={() => setStatePopUp(false)} button1={() => setStatePopUp(false)} nameButton1={"Fermer"} annuler={"Annuler"}>
                                            <div>
                                                <h1>KBIS</h1>
                                                <GetPdf file={kbis} viewPdf={true}/>
                                            </div>
                                        </Popup>

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