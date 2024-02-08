const env = import.meta.env;

const addReview = async (clientId, coachId, note) => {
    return await fetch(`${env.VITE_URL_BACK}/api/review_clients`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
            coach: `api/coaches/${coachId}`,
            client: `api/clients/${clientId}`,
            note: note,
        }),
    });
};

export { addReview };