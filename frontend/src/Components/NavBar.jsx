import { useEffect, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import "@css/NavBar.css";
import logo from "@img/logo.svg";

function NavBar({ isConnected, handleDisconnect, isAdmin }) {
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const location = useLocation();
  const links = document.querySelectorAll(".header__links");

  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/signup") {
      setIsMenuVisible(false);
    } else {
      setIsMenuVisible(true);
    }

    links.forEach((link) => {
      if (link.pathname === location.pathname) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }, [location]);

  return (
    <>
      {isMenuVisible && (
        <header className="header">
          <nav>
            <ul>
              <li>
                <Link to="/">
                  <img src={logo} alt="Logo My Coach" />
                </Link>
              </li>
              <div className="header__center">
                <li>
                  <Link to="/club" className="header__links">
                    Clubs
                  </Link>
                </li>
                <li>
                  <Link to="/schedule" className="header__links">
                    Mes cours
                  </Link>
                </li>
                <li>
                  <Link to="/scheduleReservation" className="header__links">
                   Prendrre des cours
                  </Link>
                </li>
                <li>
                  <Link to="/profile" className="header__links">
                    Profil
                  </Link>
                </li>
              </div>
              <div className="header__right">
                {
                  isAdmin && (
                    <li>
                      <Link to="/admin" className="header__links">
                        Admin
                      </Link>
                    </li>
                  )
                }
                {isConnected ? (
                  <li>
                    <Link to="/" onClick={handleDisconnect}>
                      Déconnexion
                    </Link>
                  </li>
                ) : (
                  <>
                    <li>
                      <Link to="/login">
                        Se connecter
                      </Link>
                    </li>
                    <li>
                      <Link to="/signup" className="signup">
                        Inscription
                      </Link>
                    </li>
                  </>
                )}
              </div>
            </ul>
          </nav>
        </header>
      )}

      <Outlet />
    </>
  );
}

export default NavBar;
