const env = import.meta.env;

const updateCoachProfile = async (coachId, coach) => {
    return await fetch(`${env.VITE_URL_BACK}/api/coaches/${coachId}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/merge-patch+json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
            "biography": coach.biography,
            "auth": {
                "firstname": coach.firstname,
                "lastname": coach.lastname
            }
        }),
    });
};

export { updateCoachProfile };