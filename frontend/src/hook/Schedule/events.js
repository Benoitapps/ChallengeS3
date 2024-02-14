const env = import.meta.env;

const getSlots = async (filterDateStart =null, filterDateEnd = null) => {
    try {
        const apiUrl = `${env.VITE_URL_BACK}/api/slots?page=1&startDate[before]=${filterDateEnd}&startDate[after]=${filterDateStart}`;

        const result = await fetch(apiUrl, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        let data = await result.json();
        return data;
    } catch (error) {
        console.error("Erreur lors de la recherche des slots:", error);
        throw error;
    }
};

export { getSlots };
