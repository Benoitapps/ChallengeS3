const addReview = async (coachId, clientId, note) => {
    const result = await fetch(`http://localhost:8888/api/review_coaches`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            coach: `path/${coachId}.html`,
            client: `path/${clientId}.html`,
            note: note,
        }),
    });
    return result.json();
};

export { addReview };