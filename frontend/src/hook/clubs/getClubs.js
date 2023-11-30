const getClubs = async (page) => {
    const response = await fetch("http://localhost:8888/api/franchises/with-prestations?page=" + page, 
        {
            method: "GET",
        }
    );
    return await response.json();
};

export { getClubs };