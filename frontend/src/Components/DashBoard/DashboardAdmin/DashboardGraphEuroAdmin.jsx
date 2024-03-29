import React, {useEffect, useRef, useState} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';


ChartJS.register(ArcElement, Tooltip, Legend);

function DashboardGraphEuroAdmin({valueData}) {

    const chartRef = useRef();

    const [tab, setTab] = useState([]);
    const [label, setLabel] = useState([]);
    const [nombre, setnombre] = useState([]);

    useEffect(() => {
        if(valueData !== undefined) {
            const tabName = valueData.map(objet => objet.name);
            setLabel(tabName)
            const tabcours = valueData.map(objet => objet.nbCours);
            setnombre(tabcours)
        }
    },[valueData]);

    const data = {
        labels: label,
        datasets: [
            {
                label: "L'entreprise a  ",
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
                text: "Nombre de cours par Entreprise",
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

export default DashboardGraphEuroAdmin;