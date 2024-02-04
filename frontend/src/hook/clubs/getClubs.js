const env = import.meta.env;

const getClubs = async (page) => {
    const response = await fetch(`${env.VITE_URL_BACK}/api/franchises/with-prestations?page=` + page, 
        {
            method: "GET",
            headers: {
                'Accept': "application/ld+json"
            },
        }
    );
    return await response.json();
};

export { getClubs };