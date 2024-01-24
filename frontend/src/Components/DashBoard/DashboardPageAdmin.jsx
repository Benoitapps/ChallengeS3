import React, {useEffect, useState} from 'react';
import {getFranchises} from "../../hook/manager/franchise.js";
import {Link} from "react-router-dom";
import DashboardGraphColAdmin from "./DashboardGraphColAdmin.jsx";
import '@css/Dashboard.css';

import ReactECharts from 'echarts-for-react';

function DashboardAdmin() {


    return (
        <main>
            <h1>Dashboard</h1>
            <div className="column">

            <div className="row">
               <div className="cube"> <DashboardGraphColAdmin/></div>
               {/* <div className="cube"> <DashboardGraphBi/></div>*/}
            </div>
            <div className="row">
                {/*<div className="cube">  <DashboardGraphCam/></div>*/}
                {/*    <div className="cube"> <DashboardGraphAu/></div>*/}
            </div>
            </div>

        </main>
    );
}

export default DashboardAdmin;