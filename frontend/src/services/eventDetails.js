import { getSlotDetails } from "../hook/Schedule/eventDetail.js";

const transformData = (initialData) => {
    const res = {
        coach: initialData.coach?.auth?.firstname,
        idCoach: initialData.coach?.id,
        client: initialData.client?.auth?.firstname,
        idClient: initialData.client?.id,
        title: (initialData.prestation && initialData.prestation.name) || (initialData.time_off && initialData.time_off.name),
        idPrestation: initialData.prestation?.id,
        slotId: initialData.id,
        mode:"update",
    };

    return res;
};

export const eventDetails = async (id) => {
    const initialData = await getSlotDetails(id);
    const transformedData = transformData(initialData);
    return transformedData;
};
