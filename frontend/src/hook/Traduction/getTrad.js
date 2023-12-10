const getTradFR = async () => {
    const result = await fetch(`http://localhost:8888/api/traductions/fr`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
        },
    });
    return result.json();
};


const getTradEN = async () => {
    const result = await fetch(`http://localhost:8888/api/traductions/en`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
        },
    });
    return result.json();
};

export { getTradFR, getTradEN };