import React, { useState } from 'react';
import {useTranslation} from "react-i18next";

const env = import.meta.env;

function CompanyAdd({managers, setCompanies, companies}) {
    const [wantToAdd, setWantToAdd] = useState(false);
    const { t } = useTranslation();

    const addCompany = async () => {
        let companyInputs = document.querySelectorAll(`#company-form input[id="company-name"], #company-form textarea[id="company-description"]`);
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

        setCompanies([...companies, await result.json()]);

        setWantToAdd(!wantToAdd);
    };

    return (
        <>
            <button className="user-list__button" onClick={() => setWantToAdd(!wantToAdd)}>
                Add company
            </button>
            {
                wantToAdd && (
                    <>
                        <form id="company-form" className='form-add-user'>
                            <div className="add-user">
                                <label htmlFor="manager">Manager</label>
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
                            <div className="add-user">
                                <label htmlFor="company-name">Company name</label>
                                <input type="text" placeholder='nom de la company' id="company-name" name="name"/>
                            </div>
                            <div className="add-user">
                                <label htmlFor="kbis">KBIS</label>
                                <input type="text" placeholder='KBIS de la company' name="kbis"/>
                            </div>
                            <div className="add-user">
                                <label htmlFor="company-description">Description</label>
                                <textarea name="description" id="company-description" cols="20" rows="2"></textarea>
                            </div>
                            <button type="button" onClick={() => addCompany()}>
                                {t('Add')}
                            </button>
                        </form>
                    </>
                )
            }
        </>
    );
}

export default CompanyAdd;