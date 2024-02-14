const env = import.meta.env;

const patchPrestation = async (id,name,price) => {
    try {
        const result = await fetch(`${env.VITE_URL_BACK}/api/prestations/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/merge-patch+json',
                Authorization: `Bearer ${localStorage.getItem("token")}`,

            },
            body: JSON.stringify(
                {
                    "name": name,
                    "price": parseFloat(price),
                }
            ),

        });
        let data = await result.json();
        return data;
    } catch (error) {
        console.error("Erreur de la modification de la Franchise", error);
        throw error;
    }
};

export { patchPrestation };
