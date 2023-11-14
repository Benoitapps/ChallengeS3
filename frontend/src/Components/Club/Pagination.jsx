import React from 'react';

function Pagination({ totalItems, itemsPerPage, currentPage, setCurrentPage, setLoading }) {
    const handleClick = (page) => {
        setCurrentPage(page + 1);
        setLoading(true);
    };
    
    return (
        <>
            {
                [...Array(Math.ceil(totalItems / itemsPerPage)).keys()].map(page => (
                    <button key={page} onClick={() => handleClick(page)} style={currentPage === page + 1 ? {background: 'blue', color: 'white'} : {}}>{page + 1}</button>
                ))
            }
        </>
    );
}

export default Pagination;