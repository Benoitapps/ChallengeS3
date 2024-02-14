import { addDays,addMinutes, parseISO,isSameDay } from 'date-fns';
import { getScheduleCoach } from "../hook/ScheduleReservation/scheduleCoach.js";

const transformData = (initialData, date1 , date2, lang) => {



    let tab = [];
    for (let i = 0; i < initialData.schedules.length; i++) {
        if (initialData.schedules[i].startDate >= date1 && initialData.schedules[i].startDate <= date2) {
            tab.push(initialData.schedules[i]);
        }
    }
    tab.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));


    let datenv = new Date(date1);
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
            let datenv2 = parseISO(tab[j].startDate);

            if (isSameDay(tabfiltre[i], datenv2)) {
                tabres.push(tab[j]);
                add = 1;
                j= tab.length;
            }else{
               add=0
            }
        }
        if (add === 0) {
            tabres.push({startDate: tabfiltre[i], endDate: tabfiltre[i]})

        }

    }

    const heuresEtMinutesUniquement = tabres.map(objet => {
        const startDate = new Date(objet.startDate);
        const endDate = new Date(objet.endDate);

        // Soustraire deux heures aux dates
        // startDate.setHours(startDate.getHours() +1);
        // endDate.setHours(endDate.getHours() + 1);
        endDate.setMinutes(endDate.getMinutes() +1);

        return {
            startDate: startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            endDate: endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
    });


    const dateUniquement = tabres.map(objet => ({
        formatted_date: new Date(objet.startDate).toISOString().split('T')[0]

    }));

    const tableauAvecIndex = [
        {
            daysOfWeek: [0],
            startTime: heuresEtMinutesUniquement[0].startDate? heuresEtMinutesUniquement[0].startDate : "00:00",
            endTime: heuresEtMinutesUniquement[0].endDate? heuresEtMinutesUniquement[0].endDate : "00:00",
            date : dateUniquement[0].formatted_date
        },
        {
            daysOfWeek: [1],
            startTime: heuresEtMinutesUniquement[1].startDate? heuresEtMinutesUniquement[1].startDate : "00:00",
            endTime: heuresEtMinutesUniquement[1].endDate ? heuresEtMinutesUniquement[1].endDate : "00:00",
            date : dateUniquement[1].formatted_date
        },
        {
            daysOfWeek: [2],
            startTime: heuresEtMinutesUniquement[2].startDate ? heuresEtMinutesUniquement[2].startDate : "00:00",
            endTime: heuresEtMinutesUniquement[2].endDate ? heuresEtMinutesUniquement[2].endDate : "00:00",
            date: dateUniquement[2].formatted_date
        },
        {
            daysOfWeek: [3],
            startTime: heuresEtMinutesUniquement[3].startDate? heuresEtMinutesUniquement[3].startDate : "00:00",
            endTime: heuresEtMinutesUniquement[3].endDate?heuresEtMinutesUniquement[3].endDate : "00:00",
            date: dateUniquement[3].formatted_date
        },
        {
            daysOfWeek: [4],
            startTime: heuresEtMinutesUniquement[4].startDate? heuresEtMinutesUniquement[4].startDate : "00:00",
            endTime: heuresEtMinutesUniquement[4].endDate? heuresEtMinutesUniquement[4].endDate : "00:00",
            date: dateUniquement[4].formatted_date
        },
        {
            daysOfWeek: [5],
            startTime: heuresEtMinutesUniquement[5].startDate? heuresEtMinutesUniquement[5].startDate : "00:00",
            endTime: heuresEtMinutesUniquement[5].endDate? heuresEtMinutesUniquement[5].endDate : "00:00",
            date: dateUniquement[5].formatted_date
        },
        {
            daysOfWeek: [6],
            startTime: heuresEtMinutesUniquement[6].startDate? heuresEtMinutesUniquement[6].startDate : "00:00",
            endTime: heuresEtMinutesUniquement[6].endDate? heuresEtMinutesUniquement[6].endDate : "00:00",
            date: dateUniquement[6].formatted_date
        },
    ]

    return tableauAvecIndex
};


export const sheduleCoach = async (id, date1, date2,lang) => {
    const initialData = await getScheduleCoach(id);
    console.log(initialData);
    const transformedData = transformData(initialData,  date1 ,date2,lang);
    return transformedData;
};
