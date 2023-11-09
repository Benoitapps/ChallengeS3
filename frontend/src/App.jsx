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

// Admin
import NavBarAdmin from './Components/Admin/NavBar';
import HomeAdmin from './Components/Admin/Home';
import UsersList from './Components/Admin/UsersList.jsx';

function App() {
  const [isConnected, setIsConnected] = useState(false);

  const handleDisconnect = () => {
    localStorage.removeItem('token');
    setIsConnected(false);
  }

  const handleConnect = () => {
    setIsConnected(true);
  }

  useEffect(() => {
      const token = localStorage.getItem('token');
      setIsConnected(token !== null);
  }, [isConnected]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar isConnected={isConnected} handleDisconnect={handleDisconnect} />}>
            <Route index element={<Home />} />
            <Route path="club" element={<main><h1>Liste des clubs</h1></main>} />
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<Login handleConnect={handleConnect} />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* Admin route */}
          <Route path="admin/*" 
            element={(
              <Routes>
                <Route path="/" element={<NavBarAdmin isConnected={isConnected} handleDisconnect={handleDisconnect} />}>
                  <Route index element={<HomeAdmin />} />
                  <Route path="users" element={<UsersList />} />
                </Route>
              </Routes>
            )} 
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
