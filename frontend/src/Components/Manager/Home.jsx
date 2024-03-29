import {useEffect, useState} from 'react';
import {getFranchises} from "../../hook/manager/franchise.js";
import {getCompanies} from "../../hook/manager/company.js";
import {Link} from "react-router-dom";
import PrestaManagerItem from "./PrestaManagerItem.jsx";
import {useTranslation} from "react-i18next";
const env = import.meta.env;

function Home({ isManager, companyStatus }) {
    const [franchises, setFranchises] = useState([]);
    const [franchisesLoading, setFranchisesLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        const loadData = async () => {
            setFranchisesLoading(true);

            let franchises = await getFranchises();

            setFranchises(franchises);
            setFranchisesLoading(false);
        };

        loadData();
    }, [loading]);

    const reload = async () => {
        setLoading(!loading)
    }


    return (
        <main>
            {/*<div style={{width: '50%'}}>*/}
            {companyStatus === 'accepted' ? (
                <>
                <h1>{t('MyFranchises')} :</h1>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px', marginTop: '20px'}}>
                    {franchisesLoading ? (
                        <div>{t('Loading')}...</div>
                    ) : (
                        franchises.length > 0 ? (
                            franchises.map((franchise, index) => (
                                <PrestaManagerItem club={franchise} key={index} reload={reload}/>
                            ))
                        ) : (
                            <div>
                                <p>{t('NoFranchisesMessage')}</p>
                                <Link to="/manager/franchise">
                                    <button>{t('AddFranchise')}</button>
                                </Link>
                            </div>
                        )
                    )}
                </div>
            </>
            ) : (
                <div>
                    <p>{t('CompanyNotApplied')}</p>
                    <Link to="/manager/company">
                        <button>{t('AddCompany')}</button>
                    </Link>
                </div>
            )}
        </main>
    );

}

export default Home;