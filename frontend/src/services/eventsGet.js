import { getSlots } from "../hook/Schedule/events.js";

const transformData = (initialData) => {
    return initialData.map((item, index) => {
        const startDate = new Date(item.startDate);
        const endDate = new Date(item.endDate);

        // Soustraire une heure
        // startDate.setHours(startDate.getHours() - 1);
        // endDate.setHours(endDate.getHours() - 1);

        return {
            id: item.id,
            title: item.vacation == false ?(item.prestation && item.prestation.name): "Vacation",
            start: startDate,
            end: endDate,
            backgroundColor: item.prestation ? "#2970FF" : "#646464",
        };
    });
};

export const tab = async (filterDateStart , filterDateEnd ) => {

    const initialData = await getSlots(filterDateStart, filterDateEnd);
    const transformedData = transformData(initialData);
    return transformedData;
};
