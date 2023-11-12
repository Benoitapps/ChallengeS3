const getClubs = async (page) => {
    const response = await fetch("http://localhost:8888/api/franchises?page=" + page, 
        {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
        }
    );
    return await response.json();
};

export { getClubs };