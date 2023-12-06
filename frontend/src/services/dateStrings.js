export const dateStrings =  (date ) => {
    const dateObject = new Date(date);

    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Les mois sont indexés de 0 à 11
    const day = dateObject.getDate().toString().padStart(2, '0');
    const hours = dateObject.getHours().toString().padStart(2, '0');
    const minutes = dateObject.getMinutes().toString().padStart(2, '0');
    const seconds = dateObject.getSeconds().toString().padStart(2, '0');

// Créez une chaîne de caractères lisible
    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;

    return formattedDate
}