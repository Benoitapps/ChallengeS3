const env = import.meta.env;

const patchCompany = async (id,name,description,adress,city,zip,lat,lng) => {
    try {
        const result = await fetch(`${env.VITE_URL_BACK}/api/franchises/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/merge-patch+json',
                Authorization: `Bearer ${localStorage.getItem("token")}`,

            },
            body: JSON.stringify(
                {
                    "name": name,
                    "description": description,
                    "adress": adress,
                    "city": city,
                    "zipCode": zip,
                    "lat": parseFloat(lat),
                    "lng": parseFloat(lng),
                }
            ),

        });
        let data = await result.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Erreur de la modification de la Franchise", error);
        throw error;
    }
};

export { patchCompany };
