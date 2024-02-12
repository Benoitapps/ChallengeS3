import React, {useEffect, useState} from "react";
import { getSlotsHistory } from "../../hook/History/history.js";
import HistorySlot from "./HistorySlot.jsx";
import Pagination from "../Club/Pagination.jsx";
import {historyGet} from "../../services/getHistory.js";
import '@css/History.css';


export default function TaskList({isCoach}) {

    const [slots, setSlot] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(true);

    const ITEM_PER_PAGE = 8;


    useEffect(() => {
        fetchData();
    }, [currentPage]);

    const fetchData = async () => {
        const result = await getSlotsHistory(currentPage);
        setSlot(result['hydra:member']);
        setTotalItems(result['hydra:totalItems']);
        setLoading(false);
        console.log(result['hydra:member'])

    };

    return (
        <>
            <table className="lineList">
                <thead className="history-head">
                    <tr>
                        <th>Prestation</th>
                        <th>Prénom du client</th>
                        <th>Nom du client</th>
                        <th>Prénom du coach</th>
                        <th>Nom du coach</th>
                        <th>Début de la prestation</th>
                        <th>Fin de la prestation</th>
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
