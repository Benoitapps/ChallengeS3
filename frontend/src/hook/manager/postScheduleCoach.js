const env = import.meta.env;

const postScheduleCoach = async ( dateStartTime, dateStartEndTime,dateStart,dateEnd, idCoach) => {
    try {
        const result = await fetch(`${env.VITE_URL_BACK}/api/perso_schedules`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,

            },
            body: JSON.stringify(
                {
                    "dateStart": dateStart,
                    "dateEnd": dateEnd,
                    "dateTimeStart": dateStartTime,
                    "dateTimeEnd":dateStartEndTime,
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

export { postScheduleCoach };
