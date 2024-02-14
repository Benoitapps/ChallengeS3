const env = import.meta.env;

const postEmail = async (email,subject,message) => {
    try {
        const result = await fetch(`${env.VITE_URL_BACK}/api/email`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,

            },
            body: JSON.stringify(
                {
                    "email": email,
                    "subject": subject,
                    "message": message,
                }
            ),

        });
        let data = await result.json();
        return data;
    } catch (error) {
        console.error("Erreur lors de l'envoi du mail", error);
        throw error;
    }
};

export { postEmail };
