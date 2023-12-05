const addReview = async (coachId, clientId, note) => {
    const result = await fetch(`http://localhost:8888/api/review_coaches`, {
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
    return result;
};

export { addReview };