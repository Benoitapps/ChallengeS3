const env = import.meta.env;

const getFranchisePrestations = async (id) => {
    const response = await fetch(`${env.VITE_URL_BACK}/api/franchises/${id}/prestations`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    });
    const data = await response.json();
    return data.prestations;
};

export { getFranchisePrestations };