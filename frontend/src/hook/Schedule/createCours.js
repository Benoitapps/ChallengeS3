
const postSlot = async () => {
    try {
        const result = await fetch("http://localhost:8888/api/slots", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,

            },
            body: JSON.stringify(
                {
                    "startDate": "2023-11-09T19:25:47.214Z",
                    "endDate": "2023-11-09T19:25:47.214Z",
                    "prestation": "api/prestations/27",
                    "client": "api/clients/27",
                    "coach": "api/coaches/27"
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