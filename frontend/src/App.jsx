import './assets/css/App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { accountService } from './services/account.service.js';


// Front
import UserRoute from './UserRoute.jsx';
import NavBar from './Components/NavBar';
import Login from './Components/Authentication/Login';
import SignUp from './Components/Authentication/SignUp';
import Schedule from './Components/Calendar/Schedule.jsx';
import ScheduleReservation from './Components/Calendar/ScheduleReservation.jsx';
import Profile from './Components/Profile.jsx';
import ClubsPage from './Components/ClubsPage.jsx';
import ClubDetails from './Components/Club/ClubDetails.jsx';
import HistoryPage from "./Components/Historique/HistoryPage.jsx";
import CoachPage from './Components/Coach/CoachPage.jsx';
import ClientPage from "./Components/Client/ClientPage.jsx";
import Dashboard from './Components/DashBoard/DashboardPage.jsx';

// Admin
import NavBarAdmin from './Components/Admin/NavBar';
import HomeAdmin from './Components/Admin/Home';
import UsersList from './Components/Admin/UsersList.jsx';
import CompaniesList from './Components/Admin/CompaniesList.jsx';
import AdminRoute from './AdminRoute.jsx';
import DashboardAdmin from "./Components/DashBoard/DashboardAdmin/DashboardPageAdmin.jsx";

// Manager
import NavBarManager from './Components/Manager/NavBar';
import HomeManager from './Components/Manager/Home';
import ManagerRoute from './ManagerRoute.jsx';
import AddCompany from "./Components/Manager/AddCompany.jsx";
import AddFranchise from "./Components/Manager/AddFranchise.jsx";
import AddCoach from "./Components/Manager/AddCoach.jsx";

// Special
import Unauthorize from './Components/Unauthorize.jsx';
import i18next from "./i18n.js";
import {useTranslation, Trans} from "react-i18next";
import DashboardPageAdmin from "./Components/DashBoard/DashboardAdmin/DashboardPageAdmin.jsx";

const env = import.meta.env;
function App() {
  const userIsAdmin = () => {
    const token = localStorage.getItem('token');
    if (token !== null) {
      return accountService.getValuesToken()?.roles?.includes('ROLE_ADMIN') ?? false;
    }
    return false;
  }

  const userIsManager = () => {
    const token = localStorage.getItem('token');
    if (token !== null) {
      console.log('console log du futuuuuur', accountService.getValuesToken().roles.includes('ROLE_MANAGER'));
      if (accountService.getValuesToken().roles.includes('ROLE_MANAGER') === true)
        checkCompany();
      return accountService.getValuesToken()
          .roles.includes('ROLE_MANAGER');
    }
    return false;
  }
  const userIsCoach = () => {
    const token = localStorage.getItem('token');
    if (token !== null) {
      return accountService.getValuesToken()
          .roles.includes('ROLE_COACH');
    }
    return false;
  }

  const checkCompany = async () => {
    let result = await fetch(`${env.VITE_URL_BACK}/api/companies/myCompany`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    let body = await result.json();
    console.log(body);

    if (!body.name) {
      console.log('no company');
      const newStatus = 'none';
      console.log('newstatus', newStatus);
      setCompanyStatus(newStatus);
      console.log('state company status', companyStatus);
    } else {
      console.log('company found');
      if (body.isVerified === false) {
        console.log('company not verified');
        const newStatus = 'pending';
        setCompanyStatus(newStatus);
      } else {
        console.log('company verified');
        const newStatus = 'accepted';
        setCompanyStatus(newStatus);
      }
    }
  };

  const [isConnected, setIsConnected] = useState(!!localStorage.getItem('token'));
  const [isAdmin, setIsAdmin] = useState(userIsAdmin() || false);
  const [isManager, setIsManager] = useState(userIsManager() || false);
  const [isCoach, setisCoach] = useState(userIsCoach()|| false);
  const [eventDetail, setEventDetail] = useState(null);
  const [companyStatus, setCompanyStatus] = useState('none');
  const [testState, setTestState] = useState('none');


  const handleDisconnect = () => {
    localStorage.removeItem('token');
    setIsConnected(false);
    setIsAdmin(false);
    setIsManager(false);
  }

  const handleConnect = () => {
    setIsConnected(true);
    setIsAdmin(userIsAdmin());
    setIsManager(userIsManager());
    setisCoach(userIsCoach());
  }

  useEffect(() => {
    if (localStorage.getItem('token') && accountService.getValuesToken().exp_jwt < Date.now()) {
      localStorage.removeItem('token');
    }
    setIsAdmin(userIsAdmin());
    setIsManager(userIsManager());
    setisCoach(userIsCoach());

    const token = localStorage.getItem('token');
    setIsConnected(token !== null);
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Front */}
          <Route path="/" element={<NavBar isConnected={isConnected} handleDisconnect={handleDisconnect} isAdmin={isAdmin} isManager={isManager} isCoach={isCoach} />}>
            {/* Route for user not connected */}
            <Route index element={<ClubsPage/>} />
            <Route path="club/:id" element={<ClubDetails isCoach={isCoach} isManager={isManager} isConnected={isConnected}/>} />
            <Route path="coach/:id" element={<CoachPage/>} />
            <Route path="client/:id" element={<ClientPage/>} />

            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<Login handleConnect={handleConnect} />} />

            {/* Route for user connected */}
            <Route path="schedule" element={ <UserRoute component={Schedule} onButtonClick={setEventDetail} isConnected={isConnected} isCoach={isCoach}/> } />
            <Route path="profile" element={ <UserRoute component={Profile} isConnected={isConnected}/> } />
            <Route path="prestation/:prestationId/coach/:coachId/update" element={<UserRoute component={ScheduleReservation} eventDetail={eventDetail} isUpdate={true} isConnected={isConnected}/> }  />
            <Route path="prestation/:prestationId/coach/:coachId/add" element={<UserRoute component={ScheduleReservation} eventDetail={eventDetail} isUpdate={false} isConnected={isConnected}/>} />
            <Route path="history" element={<UserRoute component={HistoryPage}isConnected={isConnected} isCoach={isCoach}/>} />


            {/* Route doesn't exist */}
            <Route path="*" element={<Navigate to="/" />} />


          </Route>

          {/* Admin route */}
          <Route path="admin/*"
            element={(
              <Routes>
                <Route path="/" element={<NavBarAdmin isConnected={isConnected} handleDisconnect={handleDisconnect} isAdmin={isAdmin} />}>
                  <Route index element={<AdminRoute index component={HomeAdmin} isAdmin={isAdmin} />} />
                  <Route path="adminDashboard" element={<AdminRoute component={DashboardAdmin} isAdmin={isAdmin} />} />
                  <Route path="users" element={<AdminRoute component={UsersList} isAdmin={isAdmin} />} />
                  <Route path="companies" element={<AdminRoute component={CompaniesList} isAdmin={isAdmin} />} />
                </Route>
              </Routes>
            )}
          />

          {/* Manager route */}
          <Route path="manager/*"
            element={(
                <Routes>
                  <Route path="/" element={<NavBarManager isConnected={isConnected} handleDisconnect={handleDisconnect} isManager={isManager} companyStatus={companyStatus} />}>
                    <Route path="home" element={<ManagerRoute component={HomeManager} isManager={isManager} companyStatus={companyStatus} testState={testState} />} />
                    <Route index element={<ManagerRoute index component={Dashboard} isManager={isManager} companyStatus={companyStatus} />} />
                    <Route path="company" element={<ManagerRoute component={AddCompany} isManager={isManager}/>} />
                    <Route path="franchise" element={<ManagerRoute component={AddFranchise} isManager={isManager}/>} />
                    <Route path="addCoach/:franchiseId" element={<ManagerRoute component={AddCoach} isManager={isManager}/>} />
                  </Route>
                </Routes>
            )}
          />
cd
          {/* Special */}
          <Route path="unauthorized" element={<Unauthorize/>} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
