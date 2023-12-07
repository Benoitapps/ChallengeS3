import React, { useEffect, useState } from 'react';
import {
    APIProvider,
    Map,
} from '@vis.gl/react-google-maps';
import {MarkerWithInfowindow} from './MarkerWithInfowindow';

const env = import.meta.env;

function MapContainer({ clubs }) {
    const [apiKeyValid, setApiKeyValid] = useState(false);

    useEffect(() => {
        if (env?.VITE_GOOGLE_MAP_TOKEN === undefined 
            || env?.VITE_GOOGLE_MAP_TOKEN === 'default' 
            || env?.VITE_GOOGLE_MAP_TOKEN === ''
        ) {
            setApiKeyValid(false);
        } else {
            setApiKeyValid(true);
        }
    }, []);

    return (
        <>
            {
                !apiKeyValid ? (
                    <div>Invalid or missing Google Maps API key</div>
                ) : (
                    <APIProvider apiKey={env.VITE_GOOGLE_MAP_TOKEN} libraries={['marker']}>
                        <Map
                            mapId={'bf51a910020fa25a'}
                            zoom={6}
                            center={{lat: 45, lng: 2}}
                            gestureHandling={'greedy'}
                            disableDefaultUI={true}
                            >
                            {
                                clubs.map((club) => {
                                    return <MarkerWithInfowindow key={club.id} club={club} />
                                })
                            }
                        </Map>
                    </APIProvider>
                )
            }
        </>
    );
}

export default MapContainer;