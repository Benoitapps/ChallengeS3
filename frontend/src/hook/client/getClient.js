const env = import.meta.env;

const getClientDetails = async (id) => {
    const result = await fetch(`${env.VITE_URL_BACK}/api/clients/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    });
    return result.json();
};

export { getClientDetails };