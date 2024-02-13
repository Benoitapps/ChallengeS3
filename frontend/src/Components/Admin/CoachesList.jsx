import React, { useState, useEffect } from 'react';
import { getCoaches } from '../../hook/admin/company';
import { useTranslation } from 'react-i18next';

function CoachesList() {
    const { t } = useTranslation();
    const [coachesLoading, setCoachesLoading] = useState(false);
    const [coaches, setCoaches] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            setCoachesLoading(true);

            let coaches = await getCoaches();

            setCoaches(coaches);
            setCoachesLoading(false);
        };

        loadData();
    }, []);

    return (
        <main className="companies-list">
            <table className="companies-list__table">
                <thead className="companies-list__table__head">
                    <tr>
                        <th>Id</th>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Biography</th>
                        <th>Prestations</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        coachesLoading 
                        ? 
                        <tr>
                            <td className="user-list-loading" colSpan="100">{t('Loading')}...</td>
                        </tr> 
                        : 
                        coaches.map((coache) => (
                            <tr key={coache.id + coache.auth.firstname} id={coache.id} className="user-list__table__body__line">
                                <td className="user-list__table__body__line__column">
                                    {coache.id}
                                </td>
                                <td className="user-list__table__body__line__column">
                                    {coache.auth.firstname}
                                </td>
                                <td className="user-list__table__body__line__column">
                                    {coache.auth.lastname}
                                </td>
                                <td className="user-list__table__body__line__column">
                                    {coache.biography}
                                </td>
                                <td className="user-list__table__body__line__column" style={{display: 'flex', flexDirection: 'column'}}>
                                    {
                                        coache.prestations.map(prestation => (
                                            <>
                                                <div key={prestation.id} style={{margin: '5px 0'}}>
                                                    {prestation.name} à {prestation.price}€
                                                </div>
                                            </>
                                        ))
                                    }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </main>
    );
}

export default CoachesList;