import React from 'react';

function Pagination({ totalItems, itemsPerPage, currentPage, setCurrentPage }) {
    
    return (
        <>
            {
                [...Array(Math.ceil(totalItems / itemsPerPage)).keys()].map(page => (
                    <button key={page} onClick={() => setCurrentPage(page + 1)} style={currentPage === page + 1 ? {background: 'blue'} : {}}>{page + 1}</button>
                ))
            }
        </>
    );
}

export default Pagination;