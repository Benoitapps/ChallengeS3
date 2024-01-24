import React, {useEffect, useState} from "react";
import { getSlotsHistory } from "../../hook/History/history.js";
import HistorySlot from "./HistorySlot.jsx";
import Pagination from "../Club/Pagination.jsx";
import {historyGet} from "../../services/getHistory.js";
import '@css/History.css';


export default function TaskList() {

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

    };

    return (
        <>
            <div className="lineList">
            {
                loading
                    ? <div>Chargement...</div>
                    : slots.map((slot, index) => (
                        <HistorySlot slot={slot} key={index}/>
                    ))
            }
            </div>

            <Pagination totalItems={totalItems} itemsPerPage={ITEM_PER_PAGE} currentPage={currentPage} setCurrentPage={setCurrentPage} setLoading={setLoading} />
        </>
    );

}
