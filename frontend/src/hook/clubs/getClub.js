const env = import.meta.env;

const getClubDetails = async (id) => {
    let result = await fetch(`${env.VITE_URL_BACK}/api/franchises/${id}`);
    return result.json();
};

export { getClubDetails };