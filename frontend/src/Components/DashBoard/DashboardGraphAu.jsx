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
import {statCoachReservation} from "../../services/StatServices/statReservByCoach.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function DashboardGraphAu() {

    const chartRef = useRef();
    const [tab, setTab] = useState([]);
    const [label, setLabel] = useState([]);
    const [note, setNote] = useState([]);

    const fetchData = async () => {
        let res = await statCoachReservation();
        setTab(res);
        return res;
    }

    useEffect(() => {
        let res = [];
        let res2 = [];
        tab.forEach(tab => {
            res.push(tab[0] + " " + tab[1]);
            res2.push(tab[2]);
        });
        setLabel(res);
        setNote(res2);
    }, [tab]);



    useEffect(() => {
        fetchData();

        chartRef.current.canvas.$chartjs.initial.height = 300;
        chartRef.current.canvas.$chartjs.initial.width = 600;
    }, []);


    const data = {
        labels:label,
        datasets: [
            {
                label: 'Nomvbre de réservation',
                data:note,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#66ff99'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#66ff99'],
                barPercentage: 1, // Ajustez cette valeur en fonction de votre préférence

            },
        ],
    };

    const options = {
        maintainAspectRatio: true,
        plugins: {
            title: {
                display: true,
                text: 'Nombre de réservation par coach',
                font: {
                    size: 16,
                },
            },
        },
    }


    return (
        <div>

            <Bar ref={chartRef}
                data={data}
                options={options}
            ></Bar>

        </div>
    );
}

export default DashboardGraphAu;