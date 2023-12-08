import React from 'react';
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

function DashboardGraphAu() {

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

    }


    return (
        <main>

            <Bar
                data={data}
                options={options}
            ></Bar>

        </main>
    );
}

export default DashboardGraphAu;