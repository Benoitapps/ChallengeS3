import { getSlotCoach } from "../../hook/ScheduleReservation/eventCoach.js";


const transformData = (initialData) => {
    return initialData.slots.map((item, index) => {
        const startDate = new Date(item.startDate);
        const endDate = new Date(item.endDate);

        // Soustraire une heure
        startDate.setHours(startDate.getHours() - 1);
        endDate.setHours(endDate.getHours() - 1);

        return {
            id: item.id,
            title: "Reservé",
            start: startDate,
            end: endDate,
            backgroundColor: item.prestation ? "#000000" : "#646464",
        };
    });
};
    // const transHorraire = (initialData) => {
    //     for (let i = 0; i < initialData.slots.length-1; i++) {
    //         let date1 = initialData.slots[i].startDate;
    //         initialData.slots[i].startDate = date1.setHours(date1.getHours() - 1);
    //         let date2 = initialData.slots[i].endDate;
    //         initialData.slots[i].endDate = date2.setHours(date2.getHours() - 1);
    //     }
    //     return initialData;
    // }


export const eventCoach = async (id) => {
    const initialData = await getSlotCoach(id);
    console.log("initialdata", initialData);
    // const res = transHorraire(initialData)
    const transformedData = transformData(initialData);
    console.log("transform",transformedData);

    return transformedData;
};
