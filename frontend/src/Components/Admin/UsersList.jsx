import { useEffect, useState } from 'react';
import { getUsers } from '../../hook/admin/user';
import '@css/Admin.css';
import { useTranslation } from 'react-i18next';

const env = import.meta.env;

function UsersList() {
    const [users, setUsers] = useState([]);
    const [usersLoading, setUsersLoading] = useState(false);
    const [beingEdited, setBeingEdited] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);
    const { t } = useTranslation();

    useEffect(() => {
        const loadData = async () => {
            setUsersLoading(true);

            let users = await getUsers();

            setUsers(users);
            setUsersLoading(false);
        };

        loadData();
    }, []);

    const onEdit = (user) => {
        setBeingEdited(!beingEdited);
        setCurrentUserId(user.id);
    };

    const onDelete = (user) => {
        fetch(`${env.VITE_URL_BACK}/api/users/` + user.id, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
        });

        let indexUser = users.findIndex(previousUser => previousUser.id === user.id);
        users.splice(indexUser, 1);
        setUsers([...users]);
    };

    const onSave = async (user) => {
        setBeingEdited(!beingEdited);
        setCurrentUserId(null);

        // get informations from inputs of user row
        let inputsUser = document.querySelectorAll(`tr[id="${user.id}"] input[type="text"]`);

        // get values from inputs
        let userModified = {};
        inputsUser.forEach(input => userModified[input.name] = input.value);

        // Add role string to roles array
        if (userModified.roles) {
            userModified.roles = userModified.roles.split(',');
        } 

        // actualize user in users list
        let indexUser = users.findIndex(previousUser => previousUser.id === user.id);
        users[indexUser] = userModified;
        users[indexUser].id = user.id;
        setUsers(users);
        
        let userWithoutId = {...userModified};
        delete userWithoutId.id;

        let userModifiedJson = JSON.stringify(userWithoutId);
        let result = await fetch(`${env.VITE_URL_BACK}/api/users/` + user.id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/merge-patch+json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            body: userModifiedJson
        });

        result = await result.json();
    }

    return (<>
            {
                usersLoading && <div>{t('Loading')}...</div>
            }
            <main className="user-list">
                <table className="user-list__table">
                    <thead className="user-list__table__head">
                    <tr>
                        <th>Id</th>
                        <th>Email</th>
                        <th>{t('Role')}</th>
                        <th>{t('FirstName')}</th>
                        <th>{t('LastName')}</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody className="user-list__table__body">
                    {users.map((user) => (
                        <tr key={user.id} id={user.id} className="user-list__table__body__line">
                            <td className="user-list__table__body__line__column">
                                {user.id}
                            </td>
                            <td className="user-list__table__body__line__column">
                                {
                                    beingEdited && currentUserId === user.id
                                        ? <input type="text" name="email" defaultValue={user.email} />
                                        : user.email
                                }
                            </td>
                            <td className="user-list__table__body__line__column">
                                {
                                    beingEdited && currentUserId === user.id
                                        ? <input type="text" name="roles" defaultValue={user.roles} />
                                        : user.roles.join(', ')
                                }
                            </td>
                            <td className="user-list__table__body__line__column">
                                {
                                    beingEdited && currentUserId === user.id
                                        ? <input type="text" name="firstname" defaultValue={user.firstname} />
                                        : user.firstname
                                }
                            </td>
                            <td className="user-list__table__body__line__column">
                                {
                                    beingEdited && currentUserId === user.id
                                        ? <input type="text" name="lastname" defaultValue={user.lastname} />
                                        : user.lastname
                                }
                            </td>
                            <td className="user-list__table__body__line__column">
                                {
                                    beingEdited && currentUserId === user.id
                                        ? <button className="user-list__button" onClick={() => onSave(user)}>
                                            {t('Save')}
                                        </button>
                                        : <button className="user-list__button" onClick={() => onEdit(user)}>
                                            {t('Update')}
                                        </button>
                                }
                                <button className="user-list__button" onClick={() => onDelete(user)}>
                                    {t('Delete')}
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </main>
    </>
    );
}

export default UsersList;