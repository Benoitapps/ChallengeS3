import {getCoachReservation} from "../../hook/Stats/getStatAllReservByCoach.js"
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
            item2.slots?.length>0?tab3.push([item2.auth.firstname, item2.auth.lastname,item2.slots.length]):null;
        });

    });
    return tab3;
};


const statCoachReservation = async (id) => {
    const manager = await idManager();
    const initialData = await getCoachReservation(manager.id);

    const transformedData = transformData(initialData);
    // console.log(transformedData)

    return transformedData;
};


const idManager = async () => {
    let test = accountService.getValuesToken();
    let id = await getIdClient(test.user_id);
    return  id.manager;
}


export {statCoachReservation};
