import { useEffect, useState } from 'react';
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
        <main className="companies-list">
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
                <table className="companies-list__table">
                    <thead className="companies-list__table__head">
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
                                <td className="companies-list__table__body__line__column">{company.id}</td>
                                <td className="companies-list__table__body__line__column verify">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960"
                                         width="24">
                                        <path
                                            fill={company.isVerified ? "var(--primary)" : "var(--text-grey)"}
                                            d="m344-60-76-128-144-32 14-148-98-112 98-112-14-148 144-32 76-128 136 58 136-58 76 128 144 32-14 148 98 112-98 112 14 148-144 32-76 128-136-58-136 58Zm34-102 102-44 104 44 56-96 110-26-10-112 74-84-74-86 10-112-110-24-58-96-102 44-104-44-56 96-110 24 10 112-74 86 74 84-10 114 110 24 58 96Zm102-318Zm-42 142 226-226-56-58-170 170-86-84-56 56 142 142Z"/>
                                    </svg>
                                    {
                                        company.isVerified
                                            ? <button className="companies-list__button"
                                                      onClick={() => handleVerifCompany(company.id, company.isVerified)}>
                                                Réfuter
                                            </button>
                                            : <button className="companies-list__button"
                                                      onClick={() => handleVerifCompany(company.id, company.isVerified)}>
                                                Vérifier
                                            </button>
                                    }
                                </td>
                                <td className="companies-list__table__body__line__column">{company.manager}</td>
                                <td className="companies-list__table__body__line__column">
                                    {
                                        beingEdited && currentCompanyId === company.id
                                            ? <input type="text" name="name" defaultValue={company.name}/>
                                            : company.name
                                    }
                                </td>
                                <td className="companies-list__table__body__line__column description">
                                    {
                                        beingEdited && currentCompanyId === company.id
                                        ? <textarea name="description" defaultValue={company.description} />
                                        : company.description
                                    }
                                </td>
                                <td className="companies-list__table__body__line__column">
                                    {
                                        beingEdited && currentCompanyId === company.id
                                            ? <button className="companies-list__button" onClick={() => onSave(company.id)}>
                                                Enregistrer
                                            </button>
                                            : <button className="companies-list__button" onClick={() => onEdit(company.id)}>
                                                Modifier
                                            </button>
                                    }
                                </td>
                                <td className="companies-list__table__body__line__column">
                                    <button className="companies-list__button" onClick={() => handlePopup(company.kbis)}>
                                        ViewKBIS
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }

            <Popup show={statePopUp} onClose={() => setStatePopUp(false)} button1={() => setStatePopUp(false)} nameButton1={"Fermer"} annuler={"Annuler"}>
                <h3>KBIS</h3>
                <GetPdf file={kbis} viewPdf={true} header={false}/>
            </Popup>
        </main>
    );
}

export default CompaniesList;