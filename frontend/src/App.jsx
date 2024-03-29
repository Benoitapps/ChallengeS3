import './assets/css/App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { accountService } from './services/account.service.js';


// Front
import UserRoute from './UserRoute.jsx';
import NavBar from './Components/NavBar';
import Login from './Components/Authentication/Login';
import ForgotPassword from './Components/Authentication/ForgotPassword';
import ForgotPasswordEditPassword from './Components/Authentication/ForgotPasswordEditPassword';
import SignUp from './Components/Authentication/SignUp';
import Schedule from './Components/Calendar/Schedule.jsx';
import ScheduleReservation from './Components/Calendar/ScheduleReservation.jsx';
import Profile from './Components/Profile/Profile.jsx';
import ClubsPage from './Components/ClubsPage.jsx';
import ClubDetails from './Components/Club/ClubDetails.jsx';
import HistoryPage from "./Components/Historique/HistoryPage.jsx";
import CoachPage from './Components/Coach/CoachPage.jsx';
import ClientPage from "./Components/Client/ClientPage.jsx";
import Dashboard from './Components/DashBoard/DashboardPage.jsx';

// Admin
import NavBarAdmin from './Components/Admin/NavBar';
import UsersList from './Components/Admin/UsersList.jsx';
import CompaniesList from './Components/Admin/CompaniesList.jsx';
import FranchisesList from './Components/Admin/FranchisesList.jsx';
import CoachesList from './Components/Admin/CoachesList.jsx';
import AdminRoute from './AdminRoute.jsx';
import DashboardAdmin from "./Components/DashBoard/DashboardAdmin/DashboardPageAdmin.jsx";

// Manager
import NavBarManager from './Components/Manager/NavBar';
import HomeManager from './Components/Manager/Home';
import ManagerRoute from './ManagerRoute.jsx';
import AddCompany from "./Components/Manager/AddCompany.jsx";
import AddFranchise from "./Components/Manager/AddFranchise.jsx";
import AddCoach from "./Components/Manager/AddCoach.jsx";
import AddPrestation from "./Components/Manager/AddPrestation.jsx";
import CoachDetails from "./Components/Manager/CoachDetails.jsx";

// Special
import Unauthorize from './Components/Unauthorize.jsx';

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
      if (accountService.getValuesToken().roles.includes('ROLE_MANAGER') === true)
        try {
          checkCompany();
        } catch (error) {
          console.error("N'a pas encore de company.");
        }
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
    try {
      let result = await fetch(`${env.VITE_URL_BACK}/api/companies/myCompany`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      let body = await result.json();
  
      if (!body.name) {
        const newStatus = 'none';
        setCompanyStatus(newStatus);
      } else {
        if (body.isVerified === false) {
          const newStatus = 'pending';
          setCompanyStatus(newStatus);
        } else {
          const newStatus = 'accepted';
          setCompanyStatus(newStatus);
        }
      }
    } catch (error) {
      console.error("N'a pas encore de company.");
    }
  };

  const [isConnected, setIsConnected] = useState(!!localStorage.getItem('token'));
  const [isAdmin, setIsAdmin] = useState(userIsAdmin() || false);
  const [isManager, setIsManager] = useState(userIsManager() || false);
  const [isCoach, setisCoach] = useState(userIsCoach()|| false);
  const [eventDetail, setEventDetail] = useState(null);
  const [companyStatus, setCompanyStatus] = useState('null');


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
      setIsConnected(false);
      setIsAdmin(false);
      setIsManager(false);
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
            <Route path="club/:id" element={<ClubDetails isCoach={isCoach} isManager={isManager} isConnected={isConnected} isAdmin={isAdmin} update={false}/>} />
            <Route path="coach/:id" element={<CoachPage isConnected={isConnected}/> } />
            <Route path="client/:id" element={<ClientPage/>} />

            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<Login handleConnect={handleConnect} />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="forgot-password/:token" element={<ForgotPasswordEditPassword />} />

            {/* Route for user connected */}
            <Route path="schedule" element={ <UserRoute component={Schedule} onButtonClick={setEventDetail} isConnected={isConnected} isCoach={isCoach}/> } />
            <Route path="profile" element={ <UserRoute component={Profile} isConnected={isConnected} isCoach={isCoach} isManager={isManager} isAdmin={isAdmin} handleDisconnect={handleDisconnect}/> } />
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
                  <Route index element={<AdminRoute index component={UsersList} isAdmin={isAdmin} />} />
                  <Route path="adminDashboard" element={<AdminRoute component={DashboardAdmin} isAdmin={isAdmin} />} />
                  <Route path="users" element={<AdminRoute component={UsersList} isAdmin={isAdmin} />} />
                  <Route path="companies" element={<AdminRoute component={CompaniesList} isAdmin={isAdmin} />} />
                  <Route path="franchises" element={<AdminRoute component={FranchisesList} isAdmin={isAdmin} />} />
                  <Route path="coaches" element={<AdminRoute component={CoachesList} isAdmin={isAdmin} />} />
                </Route>
              </Routes>
            )}
          />

          {/* Manager route */}
          <Route path="manager/*"
            element={(
                <Routes>
                  <Route path="/" element={<NavBarManager isConnected={isConnected} handleDisconnect={handleDisconnect} isManager={isManager} companyStatus={companyStatus} />}>
                    <Route index element={<ManagerRoute index component={HomeManager} isManager={isManager} companyStatus={companyStatus} />} />
                    <Route path="dashboard" element={<ManagerRoute component={Dashboard} isManager={isManager} companyStatus={companyStatus} />} />
                    <Route path="company" element={<ManagerRoute component={AddCompany} isManager={isManager} companyStatus={companyStatus} setCompanyStatus={setCompanyStatus} />} />
                    <Route path="franchise" element={<ManagerRoute component={AddFranchise} isManager={isManager} companyStatus={companyStatus} />} />
                    <Route path="addCoach/:franchiseId" element={<ManagerRoute component={AddCoach} isManager={isManager} companyStatus={companyStatus} />} />
                    <Route path="club/:id" element={<ClubDetails isCoach={isCoach} isManager={isManager} isConnected={isConnected} isAdmin={isAdmin} update={true}/>} />
                    <Route path="addPrestation/:franchiseId" element={<ManagerRoute component={AddPrestation} isManager={isManager} companyStatus={companyStatus} />} />
                    <Route path="coach/:coachId" element={<ManagerRoute component={CoachDetails} isManager={isManager} companyStatus={companyStatus} />} />
                  </Route>
                </Routes>
            )}
          />

          {/* Special */}
          <Route path="unauthorized" element={<Unauthorize/>} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
