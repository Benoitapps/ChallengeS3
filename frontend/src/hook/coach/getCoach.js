const getCoachDetails = async (id) => {
    const result = await fetch(`http://localhost:8888/api/coaches/${id}`, {
        method: 'GET',
    });
    return result.json();
};

export { getCoachDetails };