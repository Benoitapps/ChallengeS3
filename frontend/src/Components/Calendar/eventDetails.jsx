import { getSlotDetails } from "../../hook/Schedule/eventDetail.js";

const transformData = (initialData) => {
    const res = {
        coach: initialData.coach?.auth?.firstname,
        client: initialData.client?.auth?.firstname,
        title: (initialData.prestation && initialData.prestation.name) || (initialData.time_off && initialData.time_off.name),
    };

    return res;
};

export const eventDetails = async (id) => {
    const initialData = await getSlotDetails(id);
    const transformedData = transformData(initialData);
    return transformedData;
};
