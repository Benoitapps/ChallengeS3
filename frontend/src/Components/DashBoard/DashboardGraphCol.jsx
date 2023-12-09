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
import {getCoachNotes} from "../../hook/Stats/getStatAllCoachNote.js"
import {statCoachNote} from "../../services/StatServices/statNoteCoach.js"
import {forEach} from "lodash";


ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function DashboardGraphCol() {

    const chartRef = useRef();
    const [tab, setTab] = useState([]);
    const [label, setLabel] = useState([]);
    const [note, setNote] = useState([]);

    const fetchData = async () => {
        let res = await statCoachNote(1);
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
                label: 'Note moyenne par Coach',
                data: note,
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