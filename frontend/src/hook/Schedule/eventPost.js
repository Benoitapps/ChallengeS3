const env = import.meta.env;

const postSlot = async (dateStart,dateEnd, idPrestation, idCoach, idClient) => {
    try {
        const result = await fetch(`${env.VITE_URL_BACK}/api/slots`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,

            },
            body: JSON.stringify(
                {
                    "startDate": dateStart,
                    "endDate": dateEnd,
                    "prestation": "api/prestations/"+idPrestation,
                    "client": "api/clients/"+idClient,
                    "coach": "api/coaches/"+idCoach,
                    "vacation":false
                }
            ),

        });
        let data = await result.json();
        // console.log(data);
        return data;
    } catch (error) {
        console.error("Erreur lors de la creation des slots:", error);
        throw error;
    }
};

export { postSlot };
