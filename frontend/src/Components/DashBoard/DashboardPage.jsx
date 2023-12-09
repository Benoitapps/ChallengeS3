import React, {useEffect, useState} from 'react';
import {getFranchises} from "../../hook/manager/franchise.js";
import {Link} from "react-router-dom";
import DashboardGraphCol from "./DashboardGraphCol.jsx";
import DashboardGraphCam from "./DashboardGraphCam.jsx";
import DashboardGraphLine from "./DashboardGraphLine.jsx";
import DashboardGraphAu from "./DashboardGraphAu.jsx";
import DashboardGraphBi from "./DashboardGraphBi.jsx";
import '@css/Dashboard.css';


import ReactECharts from 'echarts-for-react';

function Dashboard() {


    return (
        <main>
            <h1>Dashboard</h1>
            <div className="column">

            <div className="row">
               <div className="cube"> <DashboardGraphCol/></div>
                <div className="cube"> <DashboardGraphBi/></div>
            </div>
            <div className="row">
                <div className="cube">  <DashboardGraphCam/></div>
                    <div className="cube"> <DashboardGraphAu/></div>
            </div>
            </div>

        </main>
    );
}

export default Dashboard;