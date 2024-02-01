import {getStatsAdmin} from "../../hook/admin/getStatsAdmin.js"
import {forEach} from "lodash";
import {accountService} from "../account.service.js";
import {getIdClient} from "../../hook/user/idClientUser.js";
import managerRoute from "../../ManagerRoute.jsx";

const transformData = (initialData) => {
    let tab = [];
    let tab2 = [];
    let tab3 = [];


    forEach(initialData, (item) => {
        let nbFranchise = 0;
        forEach(item.franchises, (franchise) => {
            nbFranchise++
        });
        tab.push({"name":item.name, "nbFranchise":nbFranchise});
    });
    // console.log("NBFranchise",tab)


    forEach(initialData, (item) => {
        let resNbCours = 0;
        let resPrice = 0;
        forEach(item.franchises, (franchise) => {
            forEach(franchise.prestations, (prestation) => {
               resNbCours += prestation.slots.length;
                resPrice += prestation.price * prestation.slots.length;
            });
                });
        tab2.push({"name":item.name, "nbCours":resNbCours, "price":resPrice});

    });
    // console.log("tab2",tab2)

    tab3.push(tab,tab2);
    // console.log("tab3",tab3)

    return tab3;
};


const statAdminAll = async () => {
    const initialData = await getStatsAdmin();
    // console.log("init",initialData)

    const transformedData = transformData(initialData);
    return transformedData;
};



export {statAdminAll};
