import React from 'react';
import ClubsList from './ClubsList';
import FilterBar from './FilterBar';
import map from "@img/map.png";

function ClubsPage() {
    return (
        <main>
            <div style={{display: 'flex'}}>
                <div style={{width: '50%', minHeight: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                    <FilterBar/>
                    <ClubsList/>
                </div>
                <div style={{width: '50%', borderLeft: '1px solid black'}}>
                    <img src={map} alt="map" style={{width: '100%', height: '100%'}} />
                </div>
            </div>
        </main>
    );
}

export default ClubsPage;