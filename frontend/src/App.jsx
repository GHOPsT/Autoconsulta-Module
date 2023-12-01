import React , {useState} from 'react'
import './App.css';
import { theme } from 'antd';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import Register from './components/Autoregistro/Register/Register';
import ScreenMain from './components/LandingPage/ScreenMain';
import Login from './components/Autoregistro/Login/Login';
import Solicitudes from './components/Solicitudes/Solicitudes';

function App() {

  // Login
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => {
    // Autenticacion correspondiente
    setIsLoggedIn(true)
  }

  return (
    <Router>
      <Routes>
        <Route path = '/' element={<Login />} />
        <Route path = '/register' element={<Register />} />
        <Route path = '/screenmain' element={<ScreenMain/>} />
        <Route path = '/solicitudes' element={<Solicitudes/>} />
      </Routes>
    </Router>
  );
}

export default App;