import React, { useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import { getIdClient } from "../../hook/user/idClientUser.js";


const getUserId = async () => {


    const storedValue = localStorage.getItem('token');

    if (storedValue) {
        const decodedToken = jwtDecode(storedValue);

        const user = await getIdClient(decodedToken.user_id);
        let idUser;

        if(user.client) {
            idUser = user.client.id;
        } else {
            idUser = user.coach.id;
        }

        return idUser;
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
