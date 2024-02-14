import {getFranchisePrice} from "../../hook/Stats/getStatAllFranchisePrice.js"
import {forEach} from "lodash";
import {accountService} from "../account.service.js";
import {getIdClient} from "../../hook/user/idClientUser.js";
import managerRoute from "../../ManagerRoute.jsx";

const transformData = (initialData) => {
    let tab = [];
    let tab2 = [];
    let tab3 = [];

    forEach(initialData.company, (item) => {
        tab.push(item);
    });
    forEach(tab[0], (item) => {
        item.prestations?.length>0?tab2.push(item):null;
    });
    forEach(tab2, (items) => {
        forEach(items.prestations, (item) => {
            item.slots.length>0?tab3.push([{name:items.name},{price:item.slots?.length*item.price}]):null;
        });
    });

    return tab3;
};

const statFranchisePrice = async () => {
    const manager = await idManager();
    const initialData = await getFranchisePrice(manager.id);

    const transformedData = transformData(initialData);
    return transformedData;
};


const idManager = async () => {
    let test = accountService.getValuesToken();
    let id = await getIdClient(test.user_id);
    return  id.manager;
}


export {statFranchisePrice};
