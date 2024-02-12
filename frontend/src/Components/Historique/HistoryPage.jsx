import HistoryList from './HistoryList.jsx'
import '@css/History.css';
import {useTranslation} from "react-i18next";

function HistoryPage({isCoach}) {
    const {t} = useTranslation();

    return (
        <>
        <main>
            <div className="allPage">
                <div className="titlePage">
                    <h1>{t('MyHistory')}</h1>
                </div>
                <div className="listPage">
                    <HistoryList
                        container={HistoryList}
                        isCoach={isCoach}
                        />
                </div>
            </div>
        </main>
        </>
    );
}

export default HistoryPage;