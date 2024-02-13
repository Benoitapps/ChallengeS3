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
        if (data?.message) {
            throw data;
        }
        return data;
    } catch (error) {
        console.error("Erreur lors de la recherche :", error);
        throw error;
    }
};

const getManagers = async () => {
    try {
        const result = await fetch(`${env.VITE_URL_BACK}/api/managers-without-company`, {
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

const getFranchises = async () => {
    try {
        const result = await fetch(`${env.VITE_URL_BACK}/api/franchises`, {
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
}

const getCoaches = async () => {
    try {
        const result = await fetch(`${env.VITE_URL_BACK}/api/coaches`, {
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
}

export { getCompanies, getManagers, getFranchises, getCoaches };