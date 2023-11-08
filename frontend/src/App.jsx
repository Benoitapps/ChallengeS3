import './assets/css/App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import NavBar from './Components/NavBar';
import Login from './Components/Authentication/Login';
import SignUp from './Components/Authentication/SignUp';
import Schedule from './Components/Calendar/Schedule.jsx';
import { useEffect, useState } from 'react';

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
            <Route path="club" element={<h1>Liste des clubs</h1>} />
            <Route path="signup" element={<SignUp/>} />
            <Route path="/" />
            <Route path="login" element={<Login handleConnect={handleConnect} />} />          
            <Route path="schedule" element={<Schedule/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
