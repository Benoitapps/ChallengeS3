const env = import.meta.env;

const getClubs = async (page,filter) => {

    if(filter != "") {
        const response = await fetch(`${env.VITE_URL_BACK}/api/franchises/with-prestations?name=${filter}&page=` + page,
            {
                method: "GET",
            }
        );
        return await response.json();
    } else {
        const response = await fetch(`${env.VITE_URL_BACK}/api/franchises/with-prestations?page=` + page,
            {
                method: "GET",
            }
        );
        return await response.json();
    }
};

export { getClubs };