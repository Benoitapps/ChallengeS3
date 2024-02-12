import {useEffect, useState} from 'react';
import {getFranchises} from "../../hook/manager/franchise.js";
import {Link} from "react-router-dom";
import PrestaManagerItem from "./PrestaManagerItem.jsx";
import {useTranslation} from "react-i18next";

function Home() {
    const [franchises, setFranchises] = useState([]);
    const [franchisesLoading, setFranchisesLoading] = useState(false);
    const [hasCompany, setHasCompany] = useState(true);
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
            {hasCompany ? (
                <>
                    <h1>{t('MyFranchises')} :</h1>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px', marginTop: '20px'}}>
                    {franchisesLoading && <div>{t('Loading')}...</div>}
                        {franchises.map((franchise, index) => (
                            <PrestaManagerItem club={franchise} key={index} reload={reload}/>
                        ))}
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
            {/*</div>*/}
        </main>
    );
}

export default Home;