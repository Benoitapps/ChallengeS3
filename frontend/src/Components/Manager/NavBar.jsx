import React from 'react';
import { Outlet, Link, Navigate } from "react-router-dom";
import '@css/NavBar.css';
import logo from "@img/logo.svg";
import {useTranslation} from "react-i18next";


function NavBar({ isManager, companyStatus }) {
    const{ t, i18n } = useTranslation();

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
                                    {companyStatus === 'accepted' ? (
                                        <>
                                        <li>
                                            <Link to="">Dashboard</Link>
                                        </li>
                                        <li>
                                            <Link to="home">
                                                {t("MyFranchises")}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="franchise">
                                                {t("AddFranchise")}
                                            </Link>
                                        </li>
                                        </>
                                        ) : (
                                            <li>
                                            <Link to="company">
                                                {t("AddCompany")}
                                            </Link>
                                        </li>
                                        )}
                                    </div>
                                    <div className="header__right">
                                        <li>
                                            <Link to="/">
                                                {t("Back")}
                                            </Link>
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