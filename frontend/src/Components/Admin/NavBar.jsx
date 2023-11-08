import React from 'react';
import { Outlet, Link } from "react-router-dom";
import '@css/NavBar.css';

function NavBar() {
    return (
        <>
            <header className="header">
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Admin</Link>
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
    );
}

export default NavBar;