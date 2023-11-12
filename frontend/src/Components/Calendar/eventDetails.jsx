import { getSlotDetails } from "../../hook/Schedule/eventDetail.js";

const transformData = (initialData) => {
    // Créez un nouvel objet en copiant les propriétés de l'objet initial
    const res = {
        coach: initialData.coach?.auth?.firstname,
        client: initialData.client?.auth?.firstname,
        title: (initialData.prestation && initialData.prestation.name) || (initialData.time_off && initialData.time_off.name),
    };

    return res;
};

export const eventDetails = async (id) => {
    const initialData = await getSlotDetails(id);
    console.log("initialdata", initialData);

    const transformedData = transformData(initialData);
    console.log(transformedData);
    return transformedData;
};
