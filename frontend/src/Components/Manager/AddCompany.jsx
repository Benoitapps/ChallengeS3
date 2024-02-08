import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {useTranslation} from "react-i18next";
const env = import.meta.env;

function AddCompany({ companyStatus, setCompanyStatus }) {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const{ t, i18n } = useTranslation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData(e.target);

        try {
            const result = await fetch(`${env.VITE_URL_BACK}/api/companies`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    name: data.get('name'),
                    description: data.get('description'),
                    kbis: data.get('kbis'),
                    isVerified: false,
                }),
            });
            console.log(result);
            const body = await result.json();
            console.log(body);
            if (result.status === 422) {
                setError(body.violations[0].message + ' ' + body.violations[0].propertyPath);
            } else if (!result.ok) {
                setError('Une erreur est survenue');
            } else {
                setCompanyStatus('pending');
                // navigate("/manager");
            }
        } catch (error) {
            setError('Une erreur est survenue');
        } finally {
            setLoading(false);
        }
    };

    // return (
    //     <div>
    //         <main className="authentification">
    //             <div className="login-signup">

    //                 <span>Demander l'ajout de votre entreprise :</span>

    //                 <form className="login-signup__form" onSubmit={handleSubmit}>
    //                     {
    //                         error && <p className="error">{error}</p>
    //                     }
    //                     <input type="text" id="name" name="name" placeholder="Libellé" autoComplete="name" required></input>
    //                     <input type="text" id="description" name="description" placeholder="Description" autoComplete="description" required></input>
    //                     <input type="text" id="kbis" name="kbis" placeholder="KBis" required></input>
    //                     <div className="login-signup__form__submit">
    //                         <input type="submit" value="Demander" disabled={loading}/>
    //                     </div>
    //                 </form>
    //             </div>
    //         </main>
    //     </div>
    // );
    return (
            <div>
                <main className="authentification">
                    <div className="login-signup">

                    {companyStatus === 'none' && (
                        <>
                        <span>{t("RequestAddCompany")}</span>
                        <form className="login-signup__form" onSubmit={handleSubmit}>
                            {error && <p className="error">{error}</p>}
                            <input type="text" id="name" name="name" placeholder="Libellé" autoComplete="name" required></input>
                            <input type="text" id="description" name="description" placeholder="Description" autoComplete="description" required></input>
                            <input type="text" id="kbis" name="kbis" placeholder="KBis" required></input>
                            <div className="login-signup__form__submit">
                                <input type="submit" value="Demander" disabled={loading} />
                            </div>
                        </form>
                        </>
                    )}
                    {companyStatus === 'pending' && (
                        <p>{t("PendingCompany")}</p>
                    )}
                    {companyStatus === 'accepted' && (
                        <p>{t("AcceptedCompany")}</p>
                    )}
                    </div>
                </main>
            </div>
    );
}

export default AddCompany;