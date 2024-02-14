const env = import.meta.env;

const getSlotsHistory = async (page) => {
    try {

        const apiUrl = `${env.VITE_URL_BACK}/api/slots/history?page=`+ page;

        const result = await fetch(apiUrl, {
            method: "GET",
            headers: {
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

export { getSlotsHistory };
