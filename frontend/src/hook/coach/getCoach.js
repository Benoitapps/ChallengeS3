const env = import.meta.env;

const getCoachDetails = async (id) => {
    const result = await fetch(`${env.VITE_URL_BACK}/api/coaches/${id}`, {
        method: 'GET',

    });
    return result.json();
};

const getCoachEmail = async (id) => {
    const result = await fetch(`${env.VITE_URL_BACK}/api/coaches/email/${id}`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return result.json();
};

export { getCoachDetails, getCoachEmail  };