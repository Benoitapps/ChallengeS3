import React, {useState} from 'react';

function FilterBar({addFilter}) {
    const [name, setName] = useState('');
    const [filters, setFilters] = useState(['']);

    const handleSubmit = (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
        addFilter( name );
    };

    return (
        <div>
            <form onSubmit={handleSubmit} style={{margin: "15px 10px"}}>
                <input className="preferences__input" type="text"
                       value={name} onChange={(e) => setName(e.target.value)}/>
                <button type="submit" className="preferences__button">Search</button>
            </form>
        </div>
    );
}

export default FilterBar;