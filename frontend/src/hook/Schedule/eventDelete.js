
const deleteSlot = async (id) => {

    try {

        const apiUrl = `http://localhost:8888/api/slots/${id}`;

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
