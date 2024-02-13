import React, { useState, useEffect } from 'react';
import { getFranchises } from '../../hook/admin/company';
import { useTranslation } from 'react-i18next';

function FranchisesList() {
    const { t } = useTranslation();
    const [franchisesLoading, setFranchisesLoading] = useState(false);
    const [franchises, setFranchises] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            setFranchisesLoading(true);

            let franchises = await getFranchises();

            setFranchises(franchises);
            setFranchisesLoading(false);
        };

        loadData();
    }, []);

    return (
        <main className="companies-list">
            <table className="companies-list__table">
                <thead className="companies-list__table__head">
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>Zip Code</th>
                        <th>Company</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        franchisesLoading 
                        ? 
                        <tr>
                            <td className="user-list-loading" colSpan="100">{t('Loading')}...</td>
                        </tr> 
                        : 
                        franchises.map((franchise) => (
                            <tr key={franchise.id + franchise.name} id={franchise.id} className="user-list__table__body__line">
                                <td className="user-list__table__body__line__column">
                                    {franchise.id}
                                </td>
                                <td className="user-list__table__body__line__column">
                                    {franchise.name}
                                </td>
                                <td className="user-list__table__body__line__column">
                                    {franchise.description}
                                </td>
                                <td className="user-list__table__body__line__column">
                                    {franchise.address}
                                </td>
                                <td className="user-list__table__body__line__column">
                                    {franchise.city}
                                </td>
                                <td className="user-list__table__body__line__column">
                                    {franchise.zipCode}
                                </td>
                                <td className="user-list__table__body__line__column">
                                    {franchise.company.name}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </main>
    );
}

export default FranchisesList;