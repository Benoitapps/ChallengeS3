const env = import.meta.env;

const updateClientProfile = async (clientId, client) => {
    return await fetch(`${env.VITE_URL_BACK}/api/clients/${clientId}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/merge-patch+json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
            "address": client.address,
            "city": client.city,
            "zip_code": client.zip_code,
            "auth": {
                "firstname": client.firstname,
                "lastname": client.lastname
            }
        }),
    });
};

export { updateClientProfile };