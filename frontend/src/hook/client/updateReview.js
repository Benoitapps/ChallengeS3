const env = import.meta.env;

const updateReview = async (reviewId, note) => {
    return await fetch(`${env.VITE_URL_BACK}/api/review_clients/${reviewId}`, {
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