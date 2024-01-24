const env = import.meta.env;

const patchSlot = async (dateStart, dateEnd, id) => {
    try {
        const apiUrl = `${env.VITE_URL_BACK}/api/slots/${id}`;

        const result = await fetch(apiUrl, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/merge-patch+json", // Utilisez le type de contenu correct
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                startDate: dateStart,
                endDate: dateEnd,
            }),
        });

        let data = await result.json();
        // console.log(data);
        return data;
    } catch (error) {
        console.error("Erreur lors de la mise à jour des slots :", error);
        throw error;
    }
};

export { patchSlot };
