import { useState } from 'react';
import ClubsList from './Club/ClubsList';
import FilterBar from './Club/FilterBar';
import MapContainer from './Map/MapContainer';
import '@css/Home.css';

function ClubsPage() {
    const [clubs, setClubs] = useState([]);
    const [filters, setFilters] = useState("");

    const addFilter = (filter) => {
        setFilters(filter);
    }

    return (
        <main className="home">
            <div className="home__club-list">
                <FilterBar addFilter={addFilter}/>
                <ClubsList clubs={clubs} setClubs={setClubs} filter={filters}/>
            </div>
            <div className="home__map">
                <MapContainer clubs={clubs}/>
            </div>
        </main>
    );
}

export default ClubsPage;