import React from 'react';
import { Outlet, Link, Navigate } from "react-router-dom";
import '@css/NavBar.css';

function NavBar({ isAdmin }) {
    return (
        <>
            {
                isAdmin ? (
                    <>
                        <header className="header">
                            <nav>
                                <ul>
                                    <li>
                                        <Link to="">Admin</Link>
                                    </li>
                                    <div className="header__center">
                                        <li>
                                            <Link to="users">Users</Link>
                                        </li>
                                    </div>
                                </ul>
                            </nav>
                        </header>
                        <Outlet />
                    </>
                )
                : <Navigate to="/unauthorized" />
            }
        </>
    );
}

export default NavBar;