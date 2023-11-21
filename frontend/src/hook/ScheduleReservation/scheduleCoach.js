
const getScheduleCoach = async (id) => {

    try {

        const apiUrl = `http://localhost:8888/api/coaches/shedules/${id}`;

        const result = await fetch(apiUrl, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        let data = await result.json();
        return data;
    } catch (error) {
        console.error("Erreur lors de la recherche des slots:", error);
        throw error;
    }
};

export { getScheduleCoach };
