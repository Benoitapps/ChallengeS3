const getCompanies = async () => {
    try {
        const result = await fetch("http://localhost:8888/api/companies", {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        let data = await result.json();
        if (result.status !== 200) {
            throw data;
        }
        return data;
    } catch (error) {
        console.error("Erreur lors de la recherche :", error);
        throw error;
    }
};

export { getCompanies };