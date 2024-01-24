const env = import.meta.env;

const getCoachNotes = async (id) => {
    const result = await fetch(`${env.VITE_URL_BACK}/api/managers/${id}/stats/coach`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    });
    return result.json();
};

export { getCoachNotes };