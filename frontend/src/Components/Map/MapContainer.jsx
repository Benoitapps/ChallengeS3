import React, { useEffect } from 'react';
import {
    AdvancedMarker,
    APIProvider,
    InfoWindow,
    Map,
    Marker,
    Pin
} from '@vis.gl/react-google-maps';
import {MarkerWithInfowindow} from './MarkerWithInfowindow';

const env = import.meta.env;

const ESGI_COORDINATES = {
    lat: 48.84917076352597,
    lng: 2.3897329073928284
};

// getCoordinates()
const getCoordinates = async (address) => {
    let urlEncodedAddress = encodeURIComponent(address);
    let key = env.VITE_GOOGLE_MAP_TOKEN;
    let result = await fetch('https://maps.googleapis.com/maps/api/geocode/json?' + 'address=' + urlEncodedAddress + '&key=' + key);
    result = await result.json();
    return result.results[0].geometry.location;
};

// getCoordinates().then((res) => {
//     console.log(res);
// });

function MapContainer({clubs}) {
    const [markers, setMarkers] = React.useState([]);
    useEffect(() => {
        console.log(clubs)
        // const markers = clubs.map((club) => {
        //     let res = getCoordinates(club.address).then((res) => {
        //         console.log(res);
        //         return res;
        //     });
        //     // for each clubs add a marker with the coordinates
        //     return <MarkerWithInfowindow coordinates={res} />
        // });
        setMarkers(markers);
        console.log(markers);
    }, [clubs]);

    return (
        <APIProvider apiKey={env.VITE_GOOGLE_MAP_TOKEN} libraries={['marker']}>
            <Map
                mapId={'bf51a910020fa25a'}
                zoom={6}
                center={{lat: 45, lng: 2}}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
                >
                {markers}
                {/* <MarkerWithInfowindow coordinates={ESGI_COORDINATES} /> */}
            </Map>
    </APIProvider>
    )
}

export default MapContainer;