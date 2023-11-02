import './App.css';
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import AppBar from "./components/LandingPage/AppBar"
import ScreenMain from "./components/LandingPage/ScreenMain"
import AdPanels from "./components/LandingPage/AdPanels"
import Footer from "./components/LandingPage/Footer"
import Login from './components/Autoregistro/Login/Login';
import Register from './components/Autoregistro/Register/Register';
import Dashboard from './components/Autoregistro/Dashboard/Dashboard';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <div><Login/></div>
  },
  {
    path: '/register',
    element: <div><Register/></div>
  },
  {
    path: '/dashborad',
    element: <div><Dashboard/></div>
  }
])

function App() {
  return (
    <div className="App">
      <AppBar/>
      <ScreenMain/>
      <AdPanels/>
      <Footer/>
    </div>
  );
}

export default App;
