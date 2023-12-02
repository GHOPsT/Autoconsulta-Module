import React , {useState} from 'react'
import './App.css';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import Register from './components/Autoregistro/Register/Register';
import ScreenMain from './components/LandingPage/ScreenMain';
import Login from './components/Autoregistro/Login/Login';
import Solicitudes from './components/Solicitudes/Solicitudes';
import DatosUsuario from './components/DatosUsuario/datosusuario';
import Encuesta from './components/Encuesta/Encuesta';
import Pedidos from './components/Pedidos/Pedidos';
import { DNIContext } from '../src/components/Autoregistro/Login/DNIContext';

function App() {
  const [dni, setDNI] = useState(null);

  return (
    <DNIContext.Provider value={{ dni, setDNI }}>
      <Router>
        <Routes>
          <Route path = '/' element={<Login />} />
          <Route path = '/register' element={<Register />} />
          <Route path = '/screenmain' element={<ScreenMain/>} />
          <Route path = '/solicitudes' element={<Solicitudes dni={dni}/>} />
          <Route path = '/detallesuser' element={<DatosUsuario/>} />
          <Route path = '/encuesta' element={<Encuesta/>} />
          <Route path = '/pedidos' element={<Pedidos/>} />
        </Routes>
      </Router>
    </DNIContext.Provider>
  );
}

export default App;