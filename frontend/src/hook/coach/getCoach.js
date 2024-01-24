const env = import.meta.env;

const getCoachDetails = async (id) => {
    const result = await fetch(`${env.VITE_URL_BACK}/api/coaches/${id}`, {
        method: 'GET',
    });
    return result.json();
};

export { getCoachDetails };