import { postSlot } from "../../hook/Schedule/createCours.js";

export const addslot = async () => {
    const getData = await postSlot();
    console.log("getData", getData);

    console.log(getData);
    return getData;
};
