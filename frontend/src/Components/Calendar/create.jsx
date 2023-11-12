import { postSlot } from "../../hook/Schedule/eventPost.js";

export const addslot = async (dateStart, dateEnd) => {
    const getData = await postSlot(dateStart, dateEnd);
    console.log("getData", getData);
    return getData;
};
