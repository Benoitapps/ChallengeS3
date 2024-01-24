const env = import.meta.env;

const getIdClient = async (id) => {

    try {

        const apiUrl = `${env.VITE_URL_BACK}/api/users/${id}`;

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

export { getIdClient };
