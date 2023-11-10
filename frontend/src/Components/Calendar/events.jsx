import { getSlots } from "../../hook/Schedule/events.js";

const transformData = (initialData) => {
    return initialData.map((item, index) => ({
        id: index,
        title: (item.prestation && item.prestation.name) || (item.time_off && item.time_off.name),
        start: new Date(item.startDate),
        end: new Date(item.endDate),
        backgroundColor: item.prestation ? "#02d4fc" : "#443737",
    }));
};

export const tab = async () => {
    const initialData = await getSlots();
    console.log("initialdata", initialData);

    const transformedData = transformData(initialData);
    console.log(transformedData);
    return transformedData;
};
