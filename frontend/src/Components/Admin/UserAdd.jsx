import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const env = import.meta.env;

function UserAdd({setUsers}) {
    const [wantToAdd, setWantToAdd] = useState(false);
    const { t } = useTranslation();

    const saveUser = () => {
        let inputsUser = document.querySelectorAll('.form-add-user input');
        let user = {};
        inputsUser.forEach(input => user[input.name] = input.value);

        // select roles
        let selectRole = document.querySelector('.form-add-user select');
        user.roles = selectRole.value;

        // Add role string to roles array
        if (user.roles) {
            user.roles = user.roles.split(',');
        }

        fetch(`${env.VITE_URL_BACK}/api/admin/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify(user)
        });

        setUsers(prevUsers => [...prevUsers, user]);

        setWantToAdd(!wantToAdd);
    };

    return (
        <>
            <button className="user-list__button" onClick={() => setWantToAdd(!wantToAdd)}>
                {t('AddUser')}
            </button>
            {
                wantToAdd && (
                    <form className='form-add-user'>
                        <div className="add-user">
                            <label htmlFor="firstname">{t('FirstName')}</label>
                            <input type="text" name="firstname" />
                        </div>
                        <div className="add-user">
                            <label htmlFor="lastname">{t('LastName')}</label>
                            <input type="text" name="lastname" />
                        </div>
                        <div className="add-user">
                            <label htmlFor="email">{t('Email')}</label>
                            <input type="email" name="email" />
                        </div>
                        <div className="add-user">
                            <label htmlFor="roles">{t('Role')}</label>
                            <select name="roles">
                                <option value="ROLE_USER">ROLE_USER</option>
                                {/* <option value="ROLE_COACH">ROLE_COACH</option> */}
                                <option value="ROLE_MANAGER">ROLE_MANAGER</option>
                                <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                            </select>
                        </div>
                        <div className="add-user">
                            <label htmlFor="add">Action</label>
                            <button type='button' name="add" onClick={() => saveUser()}>
                                {t('Add')}
                            </button>
                        </div>
                    </form>
                )
            }
        </>
    );
}

export default UserAdd;