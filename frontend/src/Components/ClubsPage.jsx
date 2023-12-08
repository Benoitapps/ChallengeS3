import React, { useState } from 'react';
import ClubsList from './Club/ClubsList';
import FilterBar from './Club/FilterBar';
import MapContainer from './Map/MapContainer';

function ClubsPage() {
    const [clubs, setClubs] = useState([]);
    return (
        <main>
            <div style={{display: 'flex'}}>
                <div style={{width: '50%', minHeight: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                    <FilterBar/>
                    <ClubsList clubs={clubs} setClubs={setClubs}/>
                </div>
                <div style={{width: '50%', borderLeft: '1px solid black', minHeight: "calc(100vh - 75px)"}}>
                    <MapContainer clubs={clubs}/>
                </div>
            </div>
        </main>
    );
}

export default ClubsPage;