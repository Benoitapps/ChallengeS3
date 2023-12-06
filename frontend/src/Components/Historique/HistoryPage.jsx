import React, {useEffect, useState} from 'react';
import HistoryList from './HistoryList.jsx'
import {Link} from "react-router-dom";
import {useNavigate} from 'react-router-dom';
// import HistorySlot from './HistorySlot.jsx'


function HistoryPage() {


    return (
        <main>
            <div >
                <div>
                    <HistoryList
                        container={HistoryList}
                        />
                </div>
            </div>
        </main>
    );
}

export default HistoryPage;