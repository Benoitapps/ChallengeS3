const env = import.meta.env;

const getCoachReservation = async (id) => {
    const result = await fetch(`${env.VITE_URL_BACK}/api/managers/${id}/stats/reservation`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    });
    return result.json();
};

export { getCoachReservation };