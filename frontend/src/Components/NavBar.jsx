import React from 'react';
import { Outlet, Link } from "react-router-dom";

function NavBar() {
    return (
        <>
            <nav>
                <ul style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/club">Club</Link>
                    </li>
                    <li>
                        <Link to="/signup">Inscription</Link>
                    </li>
                    <li>
                        <Link to="/login">Connexion</Link>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </>
    );
}

export default NavBar;