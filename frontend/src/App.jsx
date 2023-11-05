import React , {useState} from 'react'
import './App.css';

import { Button, Layout , theme , FloatButton} from 'antd';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';

import Sidebar from './components/LandingPage/Sidebar/Sidebar';
import ToggleThemeButton from './components/LandingPage/Sidebar/ToggleThemeButton';
import Logo from './components/LandingPage/Sidebar/Logo'

import { MenuUnfoldOutlined , MenuFoldOutlined, BellOutlined, SettingOutlined } from '@ant-design/icons'

// import AppBar from "./components/LandingPage/AppBar"
import ScreenMain from "./components/LandingPage/ScreenMain"
// import AdPanels from "./components/LandingPage/AdPanels"
import Footer from "./components/LandingPage/Footer"
import Login from './components/Autoregistro/Login/Login';
import Register from './components/Autoregistro/Register/Register';
import Dashboard from './components/Autoregistro/Dashboard/Dashboard';
import Solicitudes from './components/Solicitudes/Solicitudes'



const {Header, Sider , Content} = Layout

function App() {

  const [ darkTheme , setDarkTheme ] = useState(true)
  const [ collapsed , setCollapsed ] = useState(false)

  // Login
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => {
    // Autenticacion correspondiente
    setIsLoggedIn(true)
  }

  const toggleTheme = () =>(
    setDarkTheme(!darkTheme)
  )

  const { colorBgContainerDark} = theme.useToken();


  return (
    <Router>
      <Routes>
        <Route path = '/' element={<Login  />} />
        <Route path = '/dashboard' element={

        
        <Layout>
            <Sider 
                width = {200}
                collapsed = {collapsed}
                collapsible
                trigger = {null}
                theme = {darkTheme ? 'dark' : 'light'} className='sidebar'>
          
            <Logo />
            <Sidebar darkTheme = {darkTheme} />
            <ToggleThemeButton darkTheme = {darkTheme} toggleTheme = {toggleTheme}/>
            </Sider>

            <Layout>
            <Header style={{padding: 0,
                            background: 'white',
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center' , 
                            height: '40px'}}>
            <Button type='text' className='toggle'
                      icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                      onClick={() => setCollapsed(!collapsed)}
              />
                <Button type='text'
                        className='setting-button'
                        icon={<SettingOutlined />}/>
                <FloatButton.BackTop />

            </Header>
                          
            <Content 
                style = {{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
                background: 'white',
              }}>
              <Routes>
                {/* Colocar las rutas aqui */}
                
                {/* Inicio */}
                <Route path = '/' element = {<Login /> } />
                
                {/* Despues del Inicio */}
                <Route path = '/dashboard' element = {<Dashboard/>} />
                <Route path = '/solicitudes' element = {<Solicitudes/>} />


              </Routes>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Empresa Telefónica ©2023 </Footer>
          
            </Layout>
        </Layout>
        }
        />
      </Routes>

    </Router>
  );
}

export default App;