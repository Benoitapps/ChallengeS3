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


export default isActive;