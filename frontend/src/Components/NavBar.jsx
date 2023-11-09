import React, {useEffect} from 'react';
import { Outlet, Link, useLocation } from "react-router-dom";
import '@css/NavBar.css';
import logo from '@img/logo.svg';

function NavBar({ isConnected, handleDisconnect }) {
    const [isMenuVisible, setIsMenuVisible] = React.useState(true);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/login' || location.pathname === '/signup') {
            setIsMenuVisible(false);
        } else {
            setIsMenuVisible(true);
        }
    }, [location]);


    return (
        <>
            {
                isMenuVisible &&
                <header className="header">
                  <nav>
                      <ul>
                          <li>
                              <Link to="/"><img src={logo} alt="Logo My Coach"/></Link>
                          </li>
                          <div className="header__center">
                              <li>
                                  <Link to="/club">Clubs</Link>
                              </li>
                              <li>
                                  <Link to="/schedule">Schedule</Link>
                              </li>
                              <li>
                                  <Link to="/profile">Profil</Link>
                              </li>
                          </div>
                          <div className="header__right">
                              {
                                  isConnected
                                    ? <li>
                                        <Link to="/" onClick={handleDisconnect}>Déconnexion</Link>
                                    </li>
                                    : <>
                                        <li>
                                            <Link to="/login">Se connecter</Link>
                                        </li>
                                        <li>
                                            <Link to="/signup" className="signup">Inscription</Link>
                                        </li>
                                    </>
                              }
                          </div>
                      </ul>
                  </nav>
              </header>
            }

            <Outlet />
        </>
    );
}

export default NavBar;