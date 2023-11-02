import './assets/css/App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import NavBar from './Components/NavBar';
import Login from './Components/Authentication/Login';
import SignUp from './Components/Authentication/SignUp';
import Schedule from './Components/Schedule';
import Calendar from './Components/Calendar';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={<Home />} />
            <Route path="club" element={<h1>Liste des clubs</h1>} />
            <Route path="signup" element={<SignUp/>} />
            <Route path="login" element={<Login/>} />
            <Route path="schedule" element={<Schedule/>} />
            <Route path="calendar" element={<Calendar/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
