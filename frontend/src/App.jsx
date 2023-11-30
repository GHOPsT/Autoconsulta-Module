import React, { useState } from 'react';
import './App.css';
import { Button, Layout, BackTop, Menu, theme } from 'antd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BellOutlined,
  SettingOutlined,
} from '@ant-design/icons';

import Sidebar from './components/LandingPage/Sidebar/Sidebar';
import ToggleThemeButton from './components/LandingPage/Sidebar/ToggleThemeButton';
import Logo from './components/LandingPage/Sidebar/Logo';

import ScreenMain from './components/LandingPage/ScreenMain';
import Login from './components/Autoregistro/Login/Login';
import Register from './components/Autoregistro/Register/Register';
import Dashboard from './components/Autoregistro/Dashboard/Dashboard';
import Solicitudes from './components/Solicitudes/Solicitudes';

const { Header, Content, Footer, Sider } = Layout;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    // Autenticación correspondiente
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      <Layout>
        <Sider width={200} collapsible trigger={null} className="sidebar">
          <Logo />
        </Sider>

        <Layout>
          <Header
            style={{
              padding: 0,
              background: 'white',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: '40px',
            }}
          >
            <Button
              type="text"
              className="toggle"
              icon={
                collapsed ? (
                  <MenuUnfoldOutlined />
                ) : (
                  <MenuFoldOutlined />
                )
              }
              onClick={() => setCollapsed(!collapsed)}
            />
            <Button
              type="text"
              className="setting-button"
              icon={<SettingOutlined />}
            />
            <BackTop />
          </Header>

          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: 'white',
            }}
          >
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/solicitudes" element={<Solicitudes />} />
            </Routes>
          </Content>

          <Footer style={{ textAlign: 'center' }}>
            Empresa Telefónica ©2023
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
