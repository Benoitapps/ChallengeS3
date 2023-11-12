import React, { useEffect, useState } from 'react';
import { getClubs } from '../../hook/clubs/getClubs';
import ClubItem from './ClubItem';
import Pagination from './Pagination';

const ITEM_PER_PAGE = 4;

function ClubsList() {
    const [clubs, setClubs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    const fetchData = async () => {
        const result = await getClubs(currentPage);
        setClubs(result['hydra:member']);
        setTotalItems(result['hydra:totalItems']);
    };

    return (
        <>
            {
                clubs.map(club => (
                    <ClubItem club={club} key={club.id}/>
                ))
            }

            <Pagination totalItems={totalItems} itemsPerPage={ITEM_PER_PAGE} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </>
    );
}

export default ClubsList;