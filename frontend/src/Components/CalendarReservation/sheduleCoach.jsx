import { addDays,addMinutes, parseISO, format,isSameDay } from 'date-fns';
import { getScheduleCoach } from "../../hook/ScheduleReservation/scheduleCoach.js";

const transformData = (initialData, date1 , date2) => {

    let tab = [];
    for (let i = 0; i < initialData.schedules.length; i++) {
        if (initialData.schedules[i].start_date >= date1 && initialData.schedules[i].start_date <= date2) {
            tab.push(initialData.schedules[i]);
        }
    }
    tab.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));

    console.log("tab", tab)

    console.log("date1fefe",date1)
    const datenv = new Date(date1);
    let filtredate1 = addMinutes(datenv,1);
    let filtredate2 = addDays(filtredate1,1);
    let filtredate3 = addDays(filtredate1,2);
    let filtredate4 = addDays(filtredate1,3);
    let filtredate5 = addDays(filtredate1,4);
    let filtredate6 = addDays(filtredate1,5);
    let filtredate7 = addDays(filtredate1,6);


    console.log("les date",filtredate1 ,filtredate2 ,filtredate3 ,filtredate4 ,filtredate5 ,filtredate6 ,filtredate7 )



    let tabVrai = [];

    for (let i = 0; i < tab.length; i++) {

        const datenv1 = parseISO(tab[i].start_date);

        if (isSameDay(datenv1, filtredate1)) {
            tabVrai[0] = tab[i];
        } else if (isSameDay(datenv1, filtredate2)) {
            tabVrai[1] = tab[i];
        } else if (isSameDay(datenv1, filtredate3)) {
            tabVrai[2] = tab[i];
        } else if (isSameDay(datenv1, filtredate4)) {
            tabVrai[3] = tab[i];
        } else if (isSameDay(datenv1, filtredate5)) {
            tabVrai[4] = tab[i];
        } else if (isSameDay(datenv1, filtredate6)) {
            tabVrai[5] = tab[i];
        } else if (isSameDay(datenv1, filtredate7)) {
            tabVrai[6] = tab[i];
        }else{

        }
    }

    console.log("tabVrai",tabVrai)


    for (let i = 0; i < tabVrai.length; i++) {
        if (Object.keys(tabVrai[i]).length === 0) {
            console.log(`L'élément à l'indice ${i} est un objet vide.`);
        }
    }


    const tabVrai2 = tabVrai.map((element) => {
        if (!element) {
            return {test : "test"}; // Remplacez l'élément vide par un objet vide
        } else {
            return element;
        }
    });

    console.log("tabVrai2",tabVrai2)


    const heuresEtMinutesUniquement = tab.map(objet => ({
        start_date: new Date(objet.start_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        end_date: new Date(objet.end_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }));

    console.log("heuresEtMinutesUniquement", heuresEtMinutesUniquement);

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



    console.log("tableauAvecIndex", tableauAvecIndex)
    return tableauAvecIndex
};


export const sheduleCoach = async (id, date1, date2) => {
    const initialData = await getScheduleCoach(id);
    console.log("horraire", initialData.schedules);
    console.log("date1", date1);
    console.log("date2", date2);

    const transformedData = transformData(initialData,  date1 ,date2);
    console.log("resultat tableau ",transformedData);
    return transformedData;
};
