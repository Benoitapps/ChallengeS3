import React, {useEffect, useRef, useState} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {getCoachNotes} from "../../../hook/Stats/getStatAllCoachNote.js"
import {statCoachNote} from "../../../services/StatServices/statNoteCoach.js"
import {forEach} from "lodash";


ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function DashboardGraphColAdmin({valueData}) {

    const chartRef = useRef();
    const [tab, setTab] = useState([]);
    const [label, setLabel] = useState([]);
    const [nombre, setnombre] = useState([]);

    useEffect(() => {
        if(valueData !== undefined) {
            console.log("valueDataFR", valueData)
            const tabName = valueData.map(objet => objet.name);
            setLabel(tabName)
            const tabPrice = valueData.map(objet => objet.nbFranchise);
            setnombre(tabPrice)
        }
    },[valueData]);

    useEffect(() => {

        chartRef.current.canvas.$chartjs.initial.height = 300;
        chartRef.current.canvas.$chartjs.initial.width = 600;
    }, []);

    const data = {
        labels:label,
        datasets: [
            {
                label: 'nbFranchise',
                data: nombre,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#66ff99'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#66ff99'],
            },

        ],
    };


    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Nombre de franchise par Entreprise',
                font: {
                    size: 16,
                },
            },
        },
    }


    return (
        <div>

            <Bar
                ref={chartRef}
                data={data}
                options={options}
            ></Bar>

        </div>
    );
}

export default DashboardGraphColAdmin;