const env = import.meta.env;

const deleteSlot = async (id) => {

    try {

        const apiUrl = `${env.VITE_URL_BACK}/api/slots/${id}`;

        const result = await fetch(apiUrl, {
            method: "Delete",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

    } catch (error) {
        console.error("Erreur lors de la supr du slot ", error);
        throw error;
    }
};

export { deleteSlot };
