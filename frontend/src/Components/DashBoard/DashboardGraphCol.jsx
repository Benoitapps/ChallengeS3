import React, {useEffect, useRef} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function DashboardGraphCol() {

    const chartRef = useRef();

    useEffect(() => {
        console.log(chartRef)


        chartRef.current.canvas.$chartjs.initial.height = 300;
        chartRef.current.canvas.$chartjs.initial.width = 600;
    }, []);

    const data = {
        labels: ['Catégorie A', 'Catégorie B', 'Catégorie C', 'Catégorie D'],
        datasets: [
            {
                label: 'Nombre de joueurs',
                data: [300, 200, 100, 50],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#66ff99'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#66ff99'],
            },
            {
                label: 'Nombre de joueurs',
                data: [300, 200, 100, 50],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#66ff99'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#66ff99'],
            },
        ],
    };

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Line Chart Example',
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

export default DashboardGraphCol;