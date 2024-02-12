import { postSlot } from "../hook/Schedule/eventPost.js";

export const addslot = async (dateStart, dateEnd, idPrestation, idCoach, idClient,date) => {
    const getData = await postSlot(dateStart, dateEnd,idPrestation,idCoach,idClient,date);
    console.log("getData", getData);
    return getData;
};
