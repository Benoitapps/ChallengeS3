import React, { useEffect, useState } from 'react';
import { getUsers } from '../../hook/admin/user';

function UsersList() {
    const [users, setUsers] = useState([]);
    const [usersLoading, setUsersLoading] = useState(false);

    const [beingEdited, setBeingEdited] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);

    const [beingAdded, setBeingAdded] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            setUsersLoading(true);

            let users = await getUsers();

            setUsers(users);
            setUsersLoading(false);
        };

        loadData();
    }, []);

    const onAdd = () => {
        setBeingAdded(!beingAdded);
    };

    const addNewUser = async () => {
        let newUser = {};
        let userInputs = document.querySelectorAll('#newUserEmail, #newUserRoles, #newUserFirstname, #newUserLastname');
        
        userInputs.forEach(input => newUser[input.name] = input.value);

        // add plain password
        newUser.plainPassword = 'password' + Math.floor(Math.random() * 1000);

        alert('New user will be created with password: ' + newUser.plainPassword);

        fetch('http://localhost:8888/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser)
        });
    };

    const onEdit = (user) => {
        setBeingEdited(!beingEdited);
        setCurrentUserId(user.id);
    };

    const onDelete = (user) => {
        fetch('http://localhost:8888/api/users/' + user.id, {
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

        let userModifiedJson = JSON.stringify(userModified);

        let result = await fetch('http://localhost:8888/api/users/' + user.id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/merge-patch+json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            body: userModifiedJson
        });

        result = await result.json();
        console.log(result)
    }

    return (
        <main>
            {
                usersLoading && <div>Chargement...</div>
            }
            {
                !beingAdded && 
                <div style={{display: 'flex', justifyContent: 'end'}}>
                    <button onClick={() => onAdd()}>
                        Add new user
                    </button>
                </div>
            }

            <table style={{width: "100%"}}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Email</th>
                        <th>Rôles</th>
                        <th>Prénom</th>
                        <th>Nom</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        beingAdded && (
                            <tr>
                                <td>
                                    Id will be generated
                                </td>
                                <td>
                                    <input id="newUserEmail" type="text" name="email" />
                                </td>
                                <td>
                                    <select name="roles" id="newUserRoles">
                                        <option value="ROLE_USER" selected>ROLE_USER</option>
                                        <option value="ROLE_CLIENT">ROLE_CLIENT</option>
                                        <option value="ROLE_COACH">ROLE_COACH</option>
                                        <option value="ROLE_MANAGER">ROLE_MANAGER</option>
                                        <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                                    </select>
                                </td>
                                <td>
                                    <input id="newUserFirstname" type="text" name="firstname" />
                                </td>
                                <td>
                                    <input id="newUserLastname" type="text" name="lastname" />
                                </td>
                                <td>
                                    <button onClick={() => addNewUser()}>
                                        Add
                                    </button>
                                </td>
                            </tr>
                        )
                    }
                    {users.map((user) => (
                        <tr key={user.id} id={user.id}>
                            <td>
                                {user.id}
                            </td>
                            <td>
                                {
                                    beingEdited && currentUserId === user.id
                                        ? <input type="text" name="email" defaultValue={user.email} />
                                        : user.email
                                }
                            </td>
                            <td>
                                {
                                    beingEdited && currentUserId === user.id
                                        ? <input type="text" name="roles" defaultValue={user.roles} />
                                        : user.roles
                                }
                            </td>
                            <td>
                                {
                                    beingEdited && currentUserId === user.id
                                        ? <input type="text" name="firstname" defaultValue={user.firstname} />
                                        : user.firstname
                                }
                            </td>
                            <td>
                                {
                                    beingEdited && currentUserId === user.id
                                        ? <input type="text" name="lastname" defaultValue={user.lastname} />
                                        : user.lastname
                                }
                            </td>
                            <td>
                                {
                                    beingEdited && currentUserId === user.id
                                        ? <button onClick={() => onSave(user)}>
                                            Save
                                        </button>
                                        : <button onClick={() => onEdit(user)}>
                                            Modifier
                                        </button>
                                }
                                <button onClick={() => onDelete(user)}>
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
}

export default UsersList;