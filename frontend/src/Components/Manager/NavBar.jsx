import React from 'react';
import { Outlet, Link, Navigate } from "react-router-dom";
import '@css/NavBar.css';
import logo from "@img/logo.svg";


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
                                        <img src={logo} alt="Logo My Coach" />
                                    </li>
                                    <div className="header__center">
                                        <li>
                                            <Link to="">Dashboard</Link>
                                        </li>
                                        <li>
                                            <Link to="home">Mes Franchises</Link>
                                        </li>
                                        <li>
                                            <Link to="company">Ajouter mon entreprise</Link>
                                        </li>
                                        <li>
                                            <Link to="franchise">Ajouter une franchise</Link>
                                        </li>
                                    </div>
                                    <div className="header__right">
                                        <li>
                                            <Link to="/">Retour</Link>
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