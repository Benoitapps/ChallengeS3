import { getSlotCoach } from "../../hook/ScheduleReservation/eventCoach.js";



const transformData = (initialData) => {
    return initialData.slots.map((item, index) => ({
        id: item.id,
        // title: (item.prestation && item.prestation.name) || (item.time_off && item.time_off.name),
        title: "Indisponible",
        start: new Date(item.startDate),
        end: new Date(item.endDate),
        backgroundColor: item.prestation ? "#000000" : "#f10606",
    }));
};


export const eventCoach = async (id) => {
    const initialData = await getSlotCoach(id);
    console.log("initialdata", initialData);

    const transformedData = transformData(initialData);
    console.log(transformedData);
    return transformedData;
};
