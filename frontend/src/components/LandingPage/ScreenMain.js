
import "./ScreenMain.css"
import Sidebar from '/Sidebar/Sidebar';
import ToggleThemeButton from '../components/LandingPage/Sidebar/ToggleThemeButton';
import Logo from './components/LandingPage/Sidebar/Logo'
import Sider from "antd/es/layout/Sider";
import { useState } from "react";

const ScreenMain = () => {
  const [darkTheme, setDarkTheme ] = useState(true)
  const [collapsed, setCollapsed ] = useState(false)
    return(
        <div className="screenmain">
            <Sider>
              width = {200}
              collapsed = {collapsed}
              collapsible
              trigger = {null}
              theme = {darkTheme ? 'dark' : 'light'} className='sidebar'
              <Logo/>
              <Sidebar darkTheme = {darkTheme} />
            </Sider>
        </div>
    )
}

export default ScreenMain