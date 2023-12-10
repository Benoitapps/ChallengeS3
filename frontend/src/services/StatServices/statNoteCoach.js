import {getCoachNotes} from "../../hook/Stats/getStatAllCoachNote.js"
import {forEach} from "lodash";
import {accountService} from "../account.service.js";
import {getIdClient} from "../../hook/user/idClientUser.js";
import managerRoute from "../../ManagerRoute.jsx";

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
    forEach(tab2, (item) => {
        forEach(item, (item2) => {
            forEach(item2.reviewCoaches, (itemNote) => {
                tabNote.push(itemNote.note);
            });
            item2?tab3.push([item2.auth.firstname, item2.auth.lastname,calculateAverage(tabNote)]):null;
        });
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


 const statCoachNote = async (id) => {
    const manager = await idManager();
    const initialData = await getCoachNotes(manager.id);

    const transformedData = transformData(initialData);

    return transformedData;
};


const idManager = async () => {
    let test = accountService.getValuesToken();
    let id = await getIdClient(test.user_id);
    return  id.manager;
}


export {statCoachNote};
