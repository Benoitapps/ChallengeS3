import { useEffect, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import "@css/NavBar.css";
import logo from "@img/logo.svg";
import france from "@img/France.png";
import states from "@img/States.png";
import { useTranslation } from "react-i18next";

function NavBar({ isConnected, handleDisconnect, isAdmin, isManager, isCoach }) {
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

  const{ t, i18n } = useTranslation();

  useEffect(() => {
    const languages = document.querySelectorAll(".flag-country img");
    languages.forEach((language) => {
      if (language.id === i18n.language) {
        language.classList.add("active");
      } else {
        language.classList.remove("active");
      }
    });
  }, [t]);

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);

    const languages = document.querySelectorAll(".flag-country img");
    languages.forEach((language) => {
      if (language.id === lng) {
        language.classList.add("active");
      } else {
        language.classList.remove("active");
      }
    });
  };

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
                  <Link to="/scheduleReservation" className="header__links">
                    {t("HeaderClubs")}
                  </Link>
                </li>
                {isConnected ? (
                  <>
                    <li>
                      {!isManager && !isAdmin ?
                      <Link to="/schedule" className="header__links">
                        {t("HeaderCours")}
                      </Link>:null}
                    </li>
                    <li>
                      <Link to="/profile" className="header__links">
                        {t("HeaderProfil")}
                      </Link>
                    </li>

                    {!isManager && !isAdmin?
                    <li>
                      <Link to="/history" className="header__links">
                        {t("HeaderHistory")}
                      </Link>
                    </li>:null}
                  </>
                )
                : <></>
              }
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
                {
                    isManager && (
                        <li>
                          <Link to="/manager" className="header__links">
                            Manager
                          </Link>
                        </li>
                    )
                }
                <li className="flag-country">
                  <img id="fr" src={france} alt="Francais" onClick={() => changeLanguage("fr")} />
                  <img id="en" src={states} alt="English" onClick={() => changeLanguage("en")} />
                </li>
                {isConnected ? (
                  <li>
                    <Link to="/" onClick={handleDisconnect}>
                      {t("HeaderDeconnexion")}
                    </Link>
                  </li>
                ) : (
                  <>
                    <li>
                      <Link to="/login">
                        {t('LogIn')}
                      </Link>
                    </li>
                    <li>
                      <Link to="/signup" className="signup">
                        {t('SignUp')}
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
