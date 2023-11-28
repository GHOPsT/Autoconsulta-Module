import "./ScreenMain.css"
import Sidebar from './Sidebar/Sidebar';
import Logo from "./Sidebar/Logo";
import Sider from "antd/es/layout/Sider";
import ToggleThemeButton from "./Sidebar/ToggleThemeButton";
import { useState } from "react";
import {Button, Layout, FloatButton } from "antd";
import { Content, Header,Footer } from "antd/es/layout/layout";
import { MenuUnfoldOutlined , MenuFoldOutlined, BellOutlined, SettingOutlined } from '@ant-design/icons'
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import Solicitudes from "../Solicitudes/Solicitudes";
import Dashboard from "../Autoregistro/Dashboard/Dashboard";

const ScreenMain = () => {
  const [darkTheme, setDarkTheme ] = useState(true)
  const [collapsed, setCollapsed ] = useState(false)

  const toggleTheme = () => (
    setDarkTheme(!darkTheme)
  )
    return(
        <div className="screenmain">
            <Layout>
              <Sider
                width = {200}
                collapsed = {collapsed}
                collapsible
                trigger = {null}
                theme = {darkTheme ? 'dark' : 'light'} className='sidebar' >
                <Logo/>
                <Sidebar darkTheme = {darkTheme} />
                <ToggleThemeButton darkTheme= {darkTheme} toggleTheme= {toggleTheme} />
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
                onClick={() => setCollapsed(!collapsed)}/>
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
              background: 'white',}}>
                <Routes>
                  {/* Colocar las rutas aqui */}
                  <Route path = '/dashboard' element = {<Dashboard/>} />
                  <Route path = '/solicitudes' element = {<Solicitudes/>} />
                </Routes>
            </Content>
            <Footer style ={{textAlign: 'center'}}>Empresa Telefónica ©2023 </Footer>
            </Layout>
            </Layout>
        </div>
    )
}

export default ScreenMain