import React, { useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import { getIdClient } from "../../hook/user/idClientUser.js";


const getUserId = async () => {


    const storedValue = localStorage.getItem('token');

    if (storedValue) {
        // console.log('Retrieved value from local storage:', storedValue);
        const decodedToken = jwtDecode(storedValue);
        // console.log(decodedToken.user_id);

        const client = await getIdClient(decodedToken.user_id);
        // console.log("client",client);
        // console.log("client.client",client.client)
        const idClient = client.client.id;
        // console.log("idClient",idClient)

        return idClient;
    } else {
        console.log('No value found in local storage for the specified key');
    }

};

const getUserEmail = async () => {

    const storedValue = localStorage.getItem('token');

    if (storedValue) {
        const decodedToken = jwtDecode(storedValue);
        const emailClient = decodedToken.username;

        return emailClient;
    } else {
        console.log('No value found in local storage for the specified key');
    }

};

export { getUserId,getUserEmail};
