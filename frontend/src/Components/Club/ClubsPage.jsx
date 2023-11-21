import React from 'react';
import ClubsList from './ClubsList';
import FilterBar from './FilterBar';

function ClubsPage() {
    return (
        <main>
            <div style={{display: 'flex'}}>
                <div style={{width: '50%', border: '1px solid black'}}>
                    <FilterBar/>
                    <ClubsList/>
                </div>
                <div style={{width: '50%', border: '1px solid black'}}>
                    map
                </div>
            </div>
        </main>
    );
}

export default ClubsPage;