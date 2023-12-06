import React, {useEffect, useState} from 'react';
import HistoryList from './HistoryList.jsx'
import {Link} from "react-router-dom";
import {useNavigate} from 'react-router-dom';
// import HistorySlot from './HistorySlot.jsx'
import '@css/History.css';



function HistoryPage() {


    return (
        <>
        <main>
            <div className="allPage">
                <div className="titlePage">
                    <h1>Mon Historique</h1>
                </div>
                <div className="listPage">
                    <HistoryList
                        container={HistoryList}
                        />
                </div>
            </div>
        </main>
        </>
    );
}

export default HistoryPage;