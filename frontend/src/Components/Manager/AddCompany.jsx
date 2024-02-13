import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Viewer, Worker} from '@react-pdf-viewer/core';
import {defaultLayoutPlugin} from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import GetPdf from "./../GetPdf.jsx";
import '@css/Company.css';

const env = import.meta.env;

function AddCompany({ companyStatus, setCompanyStatus }) {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [baseFile, setBaseFile] = useState("");
    const [pdfFile, setPdfFile] = useState(null);
    const [viewPdf, setViewPdf] = useState(false);

    const fileType = ['application/pdf'];
    const handleChange = async (e) => {

        const selectedFile = e.target.files[0];
        if(selectedFile){
            if(selectedFile && fileType.includes(selectedFile.type)) {
                let reader = new FileReader();
                reader.readAsDataURL(selectedFile);
                reader.onloadend = (e) => {
                    setPdfFile(reader.result);
                    setViewPdf(true)
                }
            }else{
                setPdfFile(null);
                alert('Please select a pdf file');
            }
        }
        else{
            console.log('select your file');
        }
    }

    // const convertBase64 = (file) => {
    //     return new Promise((resolve, reject) => {
    //         const fileReader = new FileReader();
    //         fileReader.readAsDataURL(file);
    //         fileReader.onload = () => {
    //             resolve(fileReader.result);
    //             console.log("fileReader.result",fileReader.result)
    //         };
    //         fileReader.onerror = (error) => {
    //             reject(error);
    //         };
    //     });
    // }

    // const decodeBase64 = (base64) => {
    //     return atob(base64);
    // }
    //
    // const test = decodeBase64(baseFile);


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
                    kbis: pdfFile,
                    isVerified: false,
                }),
            });
            const body = await result.json();
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

    const newplugin = defaultLayoutPlugin();

    return (
        <main className="add-company">
            <div className="login-signup">
                {companyStatus === 'none' && (
                    <>
                <p className="form-title">{t('RequestCompany')}&nbsp;:</p>

                <form className="login-signup__form" onSubmit={handleSubmit}>
                    {
                        error && <p className="error">{error}</p>
                    }
                    <input type="text" id="name" name="name" placeholder={t('CompanyName')} autoComplete="name" required></input>
                    <input type="text" id="description" name="description" placeholder="Description" autoComplete="description" required></input>
                    <input type="file" id="kbis" name="kbis" placeholder="KBis" required onChange={(e)=>handleChange(e)}></input>
                    <div className="login-signup__form__submit">
                        <input type="submit" value={t('Request')} disabled={loading}/>
                    </div>
                </form>
                        <GetPdf file={pdfFile} viewPdf={viewPdf} />
                    </>
                )}
                {companyStatus === 'pending' && (
                    <p>{t('PendingCompany')}</p>
                )}
                {companyStatus === 'accepted' && (
                    <p>{t('AcceptedCompany')}</p>
                )}
            </div>
        </main>
    );

}

export default AddCompany;