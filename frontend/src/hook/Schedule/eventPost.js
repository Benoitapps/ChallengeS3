

const postSlot = async (dateStart,dateEnd, idPrestation, idCoach, idClient) => {


    try {
        const result = await fetch("http://localhost:8888/api/slots", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,

            },
            body: JSON.stringify(
                {
                    "startDate": "2023-11-15 13:00:00",
                    "endDate": "2023-11-15 14:00:00",
                    "prestation": "api/prestations/"+idPrestation,
                    "client": "api/clients/"+idClient,
                    "coach": "api/coaches/"+idCoach
                }
            ),

        });
        let data = await result.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Erreur lors de la creation des slots:", error);
        throw error;
    }
};

export { postSlot };
