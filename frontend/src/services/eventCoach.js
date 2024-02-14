import { getSlotCoach } from "../hook/ScheduleReservation/eventCoach.js";


const transformData = (initialData,lang) => {
    return initialData.slots.map((item, index) => {
        const startDate = new Date(item.startDate);
        const endDate = new Date(item.endDate);

        // Soustraire une heure
        // startDate.setHours(startDate.getHours() - 1);
        //         // endDate.setHours(endDate.getHours() - 1);

        return {
            id: item.id,
            title: lang === "fr"  ? "Indisponible" : "Unavailable",
            start: startDate,
            end: endDate,
            backgroundColor: item.prestation ? "#000000" : "#646464",
        };
    });
};

export const eventCoach = async (id,lang) => {
    const initialData = await getSlotCoach(id);
    const transformedData = transformData(initialData,lang);

    return transformedData;
};
