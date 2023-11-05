
const getSlots = async () => {
    try {
        const result = await fetch("http://localhost:8888/api/slots", {
            method: "GET",
            headers: {
                Accept: "application/json",
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
