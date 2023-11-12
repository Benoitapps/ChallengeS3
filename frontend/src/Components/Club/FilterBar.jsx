import React from 'react';

function FilterBar() {
    return (
        <>
            <input type="search" />
            <div>
                Section filtre: 
                <span>filtre 1</span>
                <span>filtre 2</span>
                <span>filtre 3</span>
                <span>filtre 4</span>
            </div>
        </>
    );
}

export default FilterBar;