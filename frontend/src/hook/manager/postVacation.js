const env = import.meta.env;

const postVacation = async (dateStart,dateEnd, idCoach) => {
    try {
        const result = await fetch(`${env.VITE_URL_BACK}/api/slots/vacation`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,

            },
            body: JSON.stringify(
                {
                    "startDate": dateStart,
                    "endDate": dateEnd,
                    "coach": "api/coaches/"+idCoach,
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

export { postVacation };
