import React from 'react';
import { Outlet, Link, Navigate } from "react-router-dom";
import '@css/NavBar.css';

function NavBar({ isManager }) {
    return (
        <>
            {
                isManager ? (
                    <>
                        <header className="header">
                            <nav>
                                <ul>
                                    <li>
                                        <Link to="">Manager</Link>
                                    </li>
                                    <div className="header__center">
                                        <li>
                                            <Link to="company">Ajouter une entreprise</Link>
                                        </li>
                                        <li>
                                            <Link to="franchise">Ajouter une franchise</Link>
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