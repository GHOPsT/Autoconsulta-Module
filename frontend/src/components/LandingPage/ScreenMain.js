import logo from "../../images/logo.svg";
import "./ScreenMain.css"
import Sidebar from './components/LandingPage/Sidebar/Sidebar';
import ToggleThemeButton from '../components/LandingPage/Sidebar/ToggleThemeButton';
import Logo from '.-/components/LandingPage/Sidebar/Logo'

const ScreenMain = () => {
    return(
        <div className="screenmain">
            <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        </div>
    )
}

export default ScreenMain