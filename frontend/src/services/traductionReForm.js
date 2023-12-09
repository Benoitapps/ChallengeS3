import { getTradFR, getTradEN } from "../hook/Traduction/getTrad.js";

const transformData = (initialData,langue) => {
    let nouvelObjet = {};

    if(langue === "fr") {
        initialData.forEach(objet => {
            nouvelObjet[objet.name] = objet.traductionFR;
        });
    }
    if(langue === "en") {
        initialData.forEach(objet => {
            nouvelObjet[objet.name] = objet.traductionEN;
        });
    }

    let resultatJSON = JSON.stringify(nouvelObjet);
    return resultatJSON;
};



export const translate= async (langue) => {
    if(langue === "fr") {
        const initialData = await getTradFR();
        const transformedData = transformData(initialData,langue);
        return transformedData;
    }else{
        const initialData = await getTradEN();
        const transformedData = transformData(initialData,langue);
        return transformedData;
    }

};
