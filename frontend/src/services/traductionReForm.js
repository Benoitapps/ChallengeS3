import {getTradFR} from "../hook/traduction/getTrad.js";
import {getTradEN} from "../hook/traduction/getTrad.js";


const transformData = (initialData) => {
    let nouvelObjet = {};

    initialData.forEach(objet => {
        nouvelObjet[objet.name] = objet.traduction;
    });

    let resultatJSON = JSON.stringify(nouvelObjet);
    return resultatJSON;
};



export const translate= async (langue) => {
    if(langue === "fr") {
        const initialData = await getTradFR();
        const transformedData = transformData(initialData);
        return transformedData;
    }else{
        const initialData = await getTradEN();
        const transformedData = transformData(initialData);

        return transformedData;
    }

};
