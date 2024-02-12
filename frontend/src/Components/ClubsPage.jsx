import React, { useState } from 'react';
import ClubsList from './Club/ClubsList';
import FilterBar from './Club/FilterBar';
import MapContainer from './Map/MapContainer';

function ClubsPage() {
    const [clubs, setClubs] = useState([]);
    const [filters, setFilters] = useState("");

    const addFilter = (filter) => {
        setFilters(filter);
    }

    return (
        <main>
            <div style={{display: 'flex'}}>
                <div style={{width: '50%', minHeight: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '20px', padding: '0 50px'}}>
                    <FilterBar addFilter={addFilter}/>
                    <ClubsList clubs={clubs} setClubs={setClubs} filter={filters}/>
                </div>
                <div style={{width: '50%', borderLeft: '1px solid black', minHeight: "calc(100vh - 75px)"}}>
                    <MapContainer clubs={clubs}/>
                </div>
            </div>
        </main>
    );
}

export default ClubsPage;