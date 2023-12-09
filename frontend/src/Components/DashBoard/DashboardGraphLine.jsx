import React, {useEffect, useRef} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function DashboardGraphLine() {

    const chartRef = useRef();

    useEffect(() => {

        chartRef.current.canvas.$chartjs.initial.height = 300;
        chartRef.current.canvas.$chartjs.initial.width = 600;
    }, []);


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
    };


const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: [12, 19, 3, 5, 2, 3],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Dataset 2',
            data: [152, 159, 35, 65, 562, 63],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

    return (
        <div>

            <Line ref={chartRef} options={options} data={data} />;

        </div>
    );
}

export default DashboardGraphLine;