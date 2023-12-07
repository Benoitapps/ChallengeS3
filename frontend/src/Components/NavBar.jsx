import { useEffect, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import "@css/NavBar.css";
import logo from "@img/logo.svg";
import france from "@img/France.png";
import states from "@img/States.png";
import {useTranslation, Trans} from "react-i18next";
import {getTrad} from "../hook/traduction/getTrad.js";



function NavBar({ isConnected, handleDisconnect, isAdmin, isManager, isCoach }) {
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const location = useLocation();
  const links = document.querySelectorAll(".header__links");
  const [language, setlanguage] = useState(false);

  useEffect(() => {
    async function fetchData() {
      let trad = await getTrad();
      console.log(trad);
    }
    if (isConnected) {
      fetchData();
    }

  }, [language]);


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

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
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
                      <Link to="/schedule" className="header__links">
                        {t("HeaderCours")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/profile" className="header__links">
                        {t("HeaderProfil")}
                      </Link>
                    </li>

                    {!isManager?
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
                <li>
                  <button className="buttonDrap" onClick={() => changeLanguage("fr")}> <img src={france} alt="Francais" /></button>
                  <button className="buttonDrap" onClick={() => changeLanguage("en")}> <img src={states} alt="English" /></button>
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
