import './assets/css/App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';

// Front
import Home from './Components/Home';
import NavBar from './Components/NavBar';
import Login from './Components/Authentication/Login';
import SignUp from './Components/Authentication/SignUp';
import Schedule from './Components/Calendar/Schedule.jsx';
import Profile from './Components/Profile.jsx';
import ClubsPage from './Components/Club/ClubsPage.jsx';

// Admin
import NavBarAdmin from './Components/Admin/NavBar';
import HomeAdmin from './Components/Admin/Home';
import UsersList from './Components/Admin/UsersList.jsx';
import AdminRoute from './AdminRoute.jsx';

// Special
import Unauthorize from './Components/Unauthorize.jsx';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleDisconnect = () => {
    localStorage.removeItem('token');
    setIsConnected(false);
    setIsAdmin(false);
  }

  const handleConnect = () => {
    setIsConnected(true);
    setIsAdmin(userIsAdmin());
  }

  useEffect(() => {
    setIsAdmin(userIsAdmin());
  }, []);

  useEffect(() => {
      const token = localStorage.getItem('token');
      setIsConnected(token !== null);
  }, [isConnected]);

  const userIsAdmin = () => {
    const token = localStorage.getItem('token');
    if (token !== null) {
      // decode jwt token
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      const user = JSON.parse(decodedPayload);
      return user.roles.includes('ROLE_ADMIN');
    }
    return false;
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Front */}
          <Route path="/" element={<NavBar isConnected={isConnected} handleDisconnect={handleDisconnect} isAdmin={isAdmin} />}>
            <Route index element={<Home />} />
            <Route path="club" element={<ClubsPage/>} />
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<Login handleConnect={handleConnect} />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* Admin route */}
          <Route path="admin/*" 
            element={(
              <Routes>
                <Route path="/" element={<NavBarAdmin isConnected={isConnected} handleDisconnect={handleDisconnect} isAdmin={isAdmin} />}>
                  <Route index element={<AdminRoute index component={HomeAdmin} isAdmin={isAdmin} />} />
                  <Route path="users" element={<AdminRoute component={UsersList} isAdmin={isAdmin} />} />
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
