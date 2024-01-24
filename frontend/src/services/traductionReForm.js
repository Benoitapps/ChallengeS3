import { getTradFR, getTradEN } from "../hook/Traduction/getTrad.js";

const transformData = (initialData,langue) => {
    let nouvelObjet = {};

    if(langue === "fr") {
        initialData.forEach(objet => {
            nouvelObjet[objet.name] = objet.traductionFR;
        });
    } else if(langue === "en") {
        initialData.forEach(objet => {
            nouvelObjet[objet.name] = objet.traductionEN;
        });
    }
    return JSON.stringify(nouvelObjet);
};



export const translate = async (langue) => {
    if(langue === "fr") {
        const initialData = await getTradFR();
        return transformData(initialData, langue);
    } else if(langue === "en") {
        const initialData = await getTradEN();
        return transformData(initialData, langue);
    }
};
