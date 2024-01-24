const env = import.meta.env;

const getTradFR = async () => {
    const result = await fetch(`${env.VITE_URL_BACK}/api/traductions/fr`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
        },
    });
    return result.json();
};


const getTradEN = async () => {
    const result = await fetch(`${env.VITE_URL_BACK}/api/traductions/en`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
        },
    });
    return result.json();
};

export { getTradFR, getTradEN };