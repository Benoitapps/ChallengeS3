import React, { useEffect, useState } from 'react';
import { getUsers } from '../../hook/admin/user';

function UsersList() {
    const [users, setUsers] = useState([]);
    const [usersLoading, setUsersLoading] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            setUsersLoading(true);

            let users = await getUsers();

            setUsers(users);
            setUsersLoading(false);
        };

        loadData();
    }, []);

    return (
        <>
            {usersLoading && <div>Chargement...</div>}
            <div>
                {users.map((user) => (
                    <div key={user.id} style={{display: 'flex', justifyContent: 'space-evenly', textAlign: 'left'}}>
                        <span style={{width: '20%'}}>
                            {user.id}
                        </span>
                        <span style={{width: '20%'}}>
                            {user.email}
                        </span>
                        <span style={{width: '20%'}}>
                            {user.roles.map((role) => {
                                return role + ' ';
                            })}
                        </span>
                        <span style={{width: '20%'}}>
                            {user.firstname}
                        </span>
                        <span style={{width: '20%'}}>
                            {user.lastname}
                        </span>
                    </div>
                ))}
            </div>
        </>
    );
}

export default UsersList;