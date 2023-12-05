import React from 'react';

function Pagination({ totalItems, itemsPerPage, currentPage, setCurrentPage, setLoading }) {
    const handleClick = (page) => {
        setCurrentPage(page + 1);
        setLoading(true);
    };
    
    return (
        <div style={{margin: "30px 0px"}}>
            {
                [...Array(Math.ceil(totalItems / itemsPerPage)).keys()].map(page => (
                    <button key={page} onClick={() => handleClick(page)} 
                        style={
                            currentPage === page + 1 
                            ? {background: 'blue', color: 'white', padding: '0px', width: '30px', height: '30px', margin: '0px 4px'} 
                            : {padding: '0px', width: '30px', height: '30px', margin: '0px 4px'}
                        }>
                        {page + 1}
                    </button>
                ))
            }
        </div>
    );
}

export default Pagination;