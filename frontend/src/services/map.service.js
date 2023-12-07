const env = import.meta.env;
// not use for now
const getCoordinates = async (address) => {
    let urlEncodedAddress = encodeURIComponent(address);
    let key = env.VITE_GOOGLE_MAP_TOKEN;
    let result = await fetch('https://maps.googleapis.com/maps/api/geocode/json?' + 'address=' + urlEncodedAddress + '&key=' + key);
    result = await result.json();
    return result.results[0].geometry.location;
};