import { addDays,addMinutes, parseISO,isSameDay } from 'date-fns';
import { getScheduleCoach } from "../../hook/ScheduleReservation/scheduleCoach.js";

const transformData = (initialData, date1 , date2) => {

    let tab = [];
    for (let i = 0; i < initialData.schedules.length; i++) {
        if (initialData.schedules[i].start_date >= date1 && initialData.schedules[i].start_date <= date2) {
            tab.push(initialData.schedules[i]);
        }
    }
    tab.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));

    const datenv = new Date(date1);
    let filtredate1 = addMinutes(datenv,1);
    let filtredate2 = addDays(filtredate1,1);
    let filtredate3 = addDays(filtredate1,2);
    let filtredate4 = addDays(filtredate1,3);
    let filtredate5 = addDays(filtredate1,4);
    let filtredate6 = addDays(filtredate1,5);
    let filtredate7 = addDays(filtredate1,6);
    let tabfiltre = [filtredate1,filtredate2,filtredate3,filtredate4,filtredate5,filtredate6,filtredate7]

    let tabres = []
    for (let i = 0; i < tabfiltre.length; i++) {
        let add = 0;
        for (let j = 0; j < tab.length; j++) {
            let datenv2 = parseISO(tab[j].start_date);

            if (isSameDay(tabfiltre[i], datenv2)) {
                tabres.push(tab[j]);
                add = 1;
                i++;
            }else{
                add=0;
            }
        }
        if (add === 0) {
            tabres.push({start_date: "2001-10-10T17:00:00+00:00", end_date: "2001-10-10T17:00:00+00:00"})

        }
    }

    const heuresEtMinutesUniquement = tabres.map(objet => ({
        start_date: new Date(objet.start_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        end_date: new Date(objet.end_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }));

    const tableauAvecIndex = [
        {
            daysOfWeek: [0],
            startTime: heuresEtMinutesUniquement[0].start_date? heuresEtMinutesUniquement[0].start_date : "00:00",
            endTime: heuresEtMinutesUniquement[0].end_date? heuresEtMinutesUniquement[0].end_date : "00:00",
        },
        {
            daysOfWeek: [1],
            startTime: heuresEtMinutesUniquement[1].start_date? heuresEtMinutesUniquement[1].start_date : "00:00",
            endTime: heuresEtMinutesUniquement[1].end_date ? heuresEtMinutesUniquement[1].end_date : "00:00",
        },
        {
            daysOfWeek: [2],
            startTime: heuresEtMinutesUniquement[2].start_date ? heuresEtMinutesUniquement[2].start_date : "00:00",
            endTime: heuresEtMinutesUniquement[2].end_date ? heuresEtMinutesUniquement[2].end_date : "00:00",
        },
        {
            daysOfWeek: [3],
            startTime: heuresEtMinutesUniquement[3].start_date? heuresEtMinutesUniquement[3].start_date : "00:00",
            endTime: heuresEtMinutesUniquement[3].end_date?heuresEtMinutesUniquement[3].end_date : "00:00",
        },
        {
            daysOfWeek: [4],
            startTime: heuresEtMinutesUniquement[4].start_date? heuresEtMinutesUniquement[4].start_date : "00:00",
            endTime: heuresEtMinutesUniquement[4].end_date? heuresEtMinutesUniquement[4].end_date : "00:00"
        },
        {
            daysOfWeek: [5],
            startTime: heuresEtMinutesUniquement[5].start_date? heuresEtMinutesUniquement[5].start_date : "00:00",
            endTime: heuresEtMinutesUniquement[5].end_date? heuresEtMinutesUniquement[5].end_date : "00:00",
        },
        {
            daysOfWeek: [6],
            startTime: heuresEtMinutesUniquement[6].start_date? heuresEtMinutesUniquement[6].start_date : "00:00",
            endTime: heuresEtMinutesUniquement[6].end_date? heuresEtMinutesUniquement[6].end_date : "00:00",
        },
    ]

    return tableauAvecIndex
};


export const sheduleCoach = async (id, date1, date2) => {
    const initialData = await getScheduleCoach(id);

    const transformedData = transformData(initialData,  date1 ,date2);
    return transformedData;
};
