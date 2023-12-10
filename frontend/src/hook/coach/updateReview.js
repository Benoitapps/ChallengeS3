const updateReview = async (reviewId, note) => {
    return await fetch(`http://localhost:8888/api/review_coaches/${reviewId}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/merge-patch+json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
            note: note,
        }),
    });
};

export { updateReview };