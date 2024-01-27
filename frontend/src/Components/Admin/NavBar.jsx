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
                                        <Link to="/">Home</Link>
                                    </li>
                                    <div className="header__center">
                                        <li>
                                            <Link to="adminDashboard">Dashboard</Link>
                                        </li>
                                        <li>
                                            <Link to="users">Users</Link>
                                        </li>
                                        <li>
                                            <Link to="companies">Companies</Link>
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