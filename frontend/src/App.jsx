import React , {useState} from 'react'
import './App.css';
import { theme } from 'antd';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import Register from './components/Autoregistro/Register/Register';
import ScreenMain from './components/LandingPage/ScreenMain';
import Login from './components/Autoregistro/Login/Login';
import Solicitudes from './components/Solicitudes/Solicitudes';
import DatosUsuario from './components/DatosUsuario/datosusuario';
import Encuesta from './components/Encuesta/Encuesta';
import { DNIContext } from '../src/components/Autoregistro/Login/DNIContext';

function App() {
  const [dni, setDNI] = useState(null);

  // Login
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => {
    // Autenticacion correspondiente
    setIsLoggedIn(true)
  }

  return (
    <DNIContext.Provider value={{ dni, setDNI }}>
      <Router>
        <Routes>
          <Route path = '/' element={<Login />} />
          <Route path = '/register' element={<Register />} />
          <Route path = '/screenmain' element={<ScreenMain/>} />
          <Route path = '/solicitudes' element={<Solicitudes/>} />
          <Route path = '/detallesuser' element={<DatosUsuario/>} />
          <Route path = '/encuesta' element={<Encuesta/>} />
        </Routes>
      </Router>
    </DNIContext.Provider>
  );
}

export default App;