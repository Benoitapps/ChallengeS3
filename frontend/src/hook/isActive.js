const isActive = async () => {
    try {
        const result = await fetch("http://localhost:8888/api", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return result.ok;
    } catch (error) {
        console.error("Erreur lors de la recherche :", error);
        throw error;
    }
}

const getUsers = async () => {
    try {
        const result = await fetch("http://localhost:8888/api/users", {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        let data = await result.json();
        return data;
    } catch (error) {
        console.error("Erreur lors de la recherche :", error);
        throw error;
    }
};

export { isActive, getUsers };