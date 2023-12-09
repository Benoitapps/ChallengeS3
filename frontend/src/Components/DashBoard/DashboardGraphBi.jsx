import React, {useEffect, useRef, useState} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import {statFranchisePrice} from "../../services/StatServices/statFranchisePrice.js"


ChartJS.register(ArcElement, Tooltip, Legend);

function DashboardGraphBi() {

    const chartRef = useRef();

    const [tab, setTab] = useState([]);
    const [label, setLabel] = useState([]);
    const [nombre, setnombre] = useState([]);

    const fetchData = async () => {
        let res = await statFranchisePrice();
        setTab(res);
        return res;
    }

    useEffect(() => {
        let res = [];
        let res2 = [];
        tab.forEach(tab => {
            res.push(tab[0].name);
            res2.push(tab[1].price);
        });
        setLabel(res);
        setnombre(res2);
    }, [tab]);

    useEffect(() => {
        fetchData();

        // chartRef.current.canvas.$chartjs.initial.height = 400;
        // chartRef.current.canvas.$chartjs.initial.width = 700;
    }, []);


    const data = {
        labels: label,
        datasets: [
            {
                label: 'La franchise a gagné ',
                data: nombre,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            title: {
                display: true,
                text: "Argent gagné par chaque franchise",
                font: {
                    size: 16,
                },
            },
        },
    }


    return (
        <div>

            <Pie ref={chartRef} data={data} options={options} />
        </div>
    );
}

export default DashboardGraphBi;