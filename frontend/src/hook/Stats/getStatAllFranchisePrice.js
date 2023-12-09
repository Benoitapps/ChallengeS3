const getFranchisePrice = async (id) => {
    const result = await fetch(`http://localhost:8888/api/managers/${id}/stats/money`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    });
    return result.json();
};

export { getFranchisePrice };