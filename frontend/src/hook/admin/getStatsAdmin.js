const getStatsAdmin = async () => {
    try {
        const result = await fetch("http://localhost:8888/api/admin/stats/all", {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        let data = await result.json();
        if (data?.message) {
            throw data;
        }
        return data;
    } catch (error) {
        console.error("Erreur lors de la recherche :", error);
        throw error;
    }
};

export { getStatsAdmin };