import { getSlotsHistory } from "../hook/History/history.js";

const transformData = (initialData) => {
    return initialData.map((item ) => {
        const startDate = new Date(item.startDate);
        const endDate = new Date(item.endDate);

        // Soustraire une heure
        startDate.setHours(startDate.getHours() - 1);
        endDate.setHours(endDate.getHours() - 1);

        return {
            id: item.id,
            prestation: (item.prestation && item.prestation.name) || (item.time_off && item.time_off.name),
            start: startDate.toString(),
            end: endDate.toString(),
            firstNameClient : item.client.auth.firstname,
            lastNameClient : item.client.auth.lastname,
            fiitemrstNameCoach : item.coach.auth.firstname,
            lastNameCoach : item.coach.auth.lastname,


        };
    });
};

export const historyGet = async (pagination ) => {
    const initialData = await getSlotsHistory(pagination);

    const transformedData = transformData(initialData['hydra:member']);
    return transformedData;
};
