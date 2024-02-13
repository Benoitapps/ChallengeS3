import React, {useEffect, useState} from "react";
import { getSlotsHistory } from "../../hook/History/history.js";
import HistorySlot from "./HistorySlot.jsx";
import Pagination from "../Club/Pagination.jsx";
import {historyGet} from "../../services/getHistory.js";
import '@css/History.css';
import {useTranslation} from "react-i18next";

export default function TaskList({isCoach}) {
    const [slots, setSlot] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(true);
    const ITEM_PER_PAGE = 8;
    const {t} = useTranslation();


    useEffect(() => {
        fetchData();
    }, [currentPage]);

    const fetchData = async () => {
        const result = await getSlotsHistory(currentPage);
        setSlot(result['hydra:member']);
        setTotalItems(result['hydra:totalItems']);
        setLoading(false);
    };

    return (
        <>
            <table className="lineList">
                <thead className="history-head">
                    <tr>
                        <th>{t('Service')}</th>
                        <th>{t('ClientFirstName')}</th>
                        <th>{t('ClientLastName')}</th>
                        <th>{t('CoachFirstName')}</th>
                        <th>{t('CoachLastName')}</th>
                        <th>{t('StartOfService')}</th>
                        <th>{t('EndOfService')}</th>
                        {!isCoach ? <th></th> : null}
                    </tr>
                </thead>
                {
                    loading
                        ? <div>Chargement...</div>
                        : slots.map((slot, index) => (
                            <HistorySlot slot={slot} key={index} isCoach={isCoach}/>
                        ))
                }
            </table>

            <Pagination totalItems={totalItems} itemsPerPage={ITEM_PER_PAGE} currentPage={currentPage} setCurrentPage={setCurrentPage} setLoading={setLoading} />
        </>
    );

}
