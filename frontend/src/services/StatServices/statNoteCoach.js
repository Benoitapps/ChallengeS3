import {getCoachNotes} from "../../hook/Stats/getStatAllCoachNote.js"
import {forEach} from "lodash";

const transformData = (initialData) => {
    let tab = [];
    let tab2 = [];
    let tab3 = [];
    let tabNote = [];

    forEach(initialData.company, (item) => {
        tab.push(item);
    });
    forEach(tab[0], (item) => {
        item.coachs?.length>0?tab2.push(item.coachs):null;
    });
    forEach(tab2[0], (item) => {

        forEach(item.reviewCoaches, (itemNote) => {
            tabNote.push(itemNote.note);
        });
        tab3.push([item.auth.firstname, item.auth.lastname,calculateAverage(tabNote)]);
    });

    return tab3;
};


function calculateAverage(notes) {
    if (notes.length === 0) {
        return 0;
    }
    const sum = notes.reduce((acc, note) => acc + note, 0);
    return sum / notes.length;
}


export const statCoachNote = async (id) => {
    const initialData = await getCoachNotes(id);

    const transformedData = transformData(initialData);

    return transformedData;
};
