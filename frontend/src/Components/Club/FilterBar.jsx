import React from 'react';

function FilterBar() {
    return (
        <div>
            <div style={{margin: "15px 10px"}}>
                <input type="search" />
                <button>Search</button>
            </div>
            <div>
                Section des filtres
            </div>
        </div>
    );
}

export default FilterBar;