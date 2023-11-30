import React, { useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

export const getUserId =  () => {

    const storedValue = localStorage.getItem('token');

    if (storedValue) {
        console.log('Retrieved value from local storage:', storedValue);
        const decodedToken = jwtDecode(storedValue);
        console.log(decodedToken);
        console.log(decodedToken.user_id);

        return decodedToken.user_id;
    } else {
        console.log('No value found in local storage for the specified key');
    }

};
