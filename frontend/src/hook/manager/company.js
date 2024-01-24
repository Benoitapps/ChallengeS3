const env = import.meta.env;

const getCompanies = async () => {
    try {
        const result = await fetch(`${env.VITE_URL_BACK}/api/companies`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        let data = await result.json();
        if (data?.message){
            throw data;
        }
        return data;
    } catch (error) {
        console.error("Erreur lors de la recherche :", error);
        throw error;
    }
};

export { getCompanies };