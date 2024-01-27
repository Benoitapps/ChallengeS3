    import React, { useEffect, useState } from 'react';
import { getClubs } from '../../hook/clubs/getClubs';
import ClubItem from './ClubItem';
import Pagination from './Pagination';

const ITEM_PER_PAGE = 4;

function ClubsList({clubs, setClubs}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    const fetchData = async () => {
        const result = await getClubs(currentPage);
        setClubs(result['hydra:member']);
        setTotalItems(result['hydra:totalItems']);
        setLoading(false);
    };

    return (
        <>
            {
                loading 
                ? <div>Chargement...</div> 
                : clubs.map((club, index) => (
                    <ClubItem club={club} key={index}/>
                ))
            }

            <Pagination totalItems={totalItems} itemsPerPage={ITEM_PER_PAGE} currentPage={currentPage} setCurrentPage={setCurrentPage} setLoading={setLoading} />
        </>
    );
}

export default ClubsList;