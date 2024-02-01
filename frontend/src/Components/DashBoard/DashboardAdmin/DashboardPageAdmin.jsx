import React, {useEffect, useState} from 'react';
import {getFranchises} from "../../../hook/manager/franchise.js";
import {Link} from "react-router-dom";
import DashboardGraphColAdmin from "./DashboardGraphColAdmin.jsx";
import '@css/Dashboard.css';

import ReactECharts from 'echarts-for-react';
import {getStatsAdmin} from "../../../hook/admin/getStatsAdmin.js";
import {statAdminAll} from "../../../services/StatServices/statAdminAll.js";
import DashboardGraphCoursAdmin from "./DashboardGraphCoursAdmin.jsx";
import DashboardGraphEuroAdmin from "./DashboardGraphEuroAdmin.jsx";

function DashboardAdmin() {

    const [tab, setTab] = useState([]);

    const fetchData = async () => {
        let res = await statAdminAll();
        setTab(res);
        return res;
    }

    useEffect(() => {
        fetchData();
    },[]);

    return (
        <main>
            <h1>Dashboard</h1>
            <div className="column">

            <div className="row">
                <div className="cube"> <DashboardGraphCoursAdmin valueData={tab[1]} /></div>
                <div className="cube"> <DashboardGraphEuroAdmin valueData={tab[1]}/></div>
            </div>
            <div className="row">
                <div className="cube"> <DashboardGraphColAdmin valueData={tab[0]}/></div>
                {/*    <div className="cube"> <DashboardGraphAu/></div>*/}
            </div>
            </div>

        </main>
    );
}

export default DashboardAdmin;