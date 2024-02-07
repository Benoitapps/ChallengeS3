const env = import.meta.env;

const updateManagerProfile = async (managerId, manager) => {
    return await fetch(`${env.VITE_URL_BACK}/api/managers/${managerId}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/merge-patch+json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
            "auth": {
                "firstname": manager.firstname,
                "lastname": manager.lastname
            }
        }),
    });
};

export { updateManagerProfile };