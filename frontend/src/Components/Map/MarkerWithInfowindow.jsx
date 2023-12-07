import React, { useState } from "react";
import {
    AdvancedMarker,
    InfoWindow,
    useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";

export const MarkerWithInfowindow = ({ club }) => {
    const [infowindowOpen, setInfowindowOpen] = useState(false);
    const [markerRef, marker] = useAdvancedMarkerRef();

    return (
        <>
            <AdvancedMarker
                ref={markerRef}
                onClick={() => setInfowindowOpen(true)}
                position={{ lat: club.lat, lng: club.lng }}
                title={"AdvancedMarker that opens an Infowindow when clicked."}
            />
            {infowindowOpen && (
                <InfoWindow
                    anchor={marker}
                    maxWidth={200}
                    onCloseClick={() => setInfowindowOpen(false)}
                >
                    <div>
                        <h3>{club.name}</h3>
                        <>{club.address}, {club.city}, {club.zipCode}</>
                    </div>
                </InfoWindow>
            )}
        </>
    );
};
