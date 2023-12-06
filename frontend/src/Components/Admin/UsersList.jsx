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
        <main>
            {
                usersLoading && <div>Chargement...</div>
            }
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Email</th>
                        <th>Rôles</th>
                        <th>Prénom</th>
                        <th>Nom</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.email}</td>
                            <td>
                                {user.roles.map((role) => {
                                    return role + ' ';
                                })}
                            </td>
                            <td>{user.firstname}</td>
                            <td>{user.lastname}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
}

export default UsersList;