const env = import.meta.env;

const updateAdminProfile = async (adminId, admin) => {
    return await fetch(`${env.VITE_URL_BACK}/api/users/${adminId}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/merge-patch+json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
            "email": admin.email,
            // "plainPassword": admin.password,
            "firstname": admin.firstname,
            "lastname": admin.lastname
        }),
    });
};

export { updateAdminProfile };