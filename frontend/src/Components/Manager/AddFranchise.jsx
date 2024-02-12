import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
const env = import.meta.env;

function AddFranchise() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const { t } = useTranslation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData(e.target);

        try {
            const result = await fetch(`${env.VITE_URL_BACK}/api/franchises`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    name: data.get('name'),
                    description: data.get('description'),
                    address: data.get('address'),
                    city: data.get('city'),
                    zipCode: data.get('zip_code'),
                    lat: parseFloat(data.get('lat')),
                    lng: parseFloat(data.get('lng')),
                    image: imageFile,
                }),
            });
            const body = await result.json();
            if (result.status === 422) {
                setError(body.violations[0].message + ' ' + body.violations[0].propertyPath);
            } else if (!result.ok) {
                setError('Une erreur est survenue');
            } else {
                // navigate("/login");
            }
        } catch (error) {
            setError('Une erreur est survenue');
        } finally {
            setLoading(false);
        }
    };

    const fileType = ['image/png', 'image/jpeg', 'image/jpg']
    const handleChange = async (e) => {

        const selectedFile = e.target.files[0];
        if(selectedFile){
            if(selectedFile && fileType.includes(selectedFile.type)) {
                let reader = new FileReader();
                reader.readAsDataURL(selectedFile);
                reader.onloadend = (e) => {
                    setImageFile(reader.result);
                }
            }else{
                setImageFile(null);
                alert('Please select a pdf file');
            }
        }
        else{
            console.log('select your file');
        }
    }

    return (
        <main className="add-franchise">
            <div className="franchise-card">
                <div className="login-signup">

                    <p className="form-title">{t('AddFranchise')}&nbsp;:</p>

                    <form className="login-signup__form" onSubmit={handleSubmit}>
                        {
                            error && <p className="error">{error}</p>
                        }
                        <input type="text" id="name" name="name" placeholder={t('CompanyName')} autoComplete="name"
                               required></input>
                        <input type="text" id="description" name="description" placeholder="Description"
                               autoComplete="description" required></input>
                        <input type="text" id="address" name="address" placeholder={t('Adress')} required></input>
                        <input type="text" id="city" name="city" placeholder={t('City')} required></input>
                        <input type="number" id="zip_code" name="zip_code" placeholder={t('ZipCode')} required></input>
                        <input type="number" id="lng" name="lng" placeholder="lng" required></input>
                        <input type="number" id="lat" name="lat" placeholder="lat" required></input>
                        <input type="file" onChange={handleChange}/>
                        <div className="login-signup__form__submit">
                            <input type="submit" value={t('Add')} disabled={loading}/>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default AddFranchise;