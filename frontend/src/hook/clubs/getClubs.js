const getClubs = async (page) => {
    const response = await fetch("http://localhost:8888/api/franchises?page=" + page);
    return await response.json();
};

export { getClubs };