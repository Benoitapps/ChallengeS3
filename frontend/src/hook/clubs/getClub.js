const getClubDetails = async (id) => {
    let result = await fetch(`http://localhost:8888/api/franchises/${id}`);
    return result.json();
};

export { getClubDetails };