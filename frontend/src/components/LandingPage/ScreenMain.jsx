import "./ScreenMain.css";
import Sidebar from './Sidebar/Sidebar';
import ToggleThemeButton from "./Sidebar/ToggleThemeButton";
import Logo from "./Sidebar/Logo";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import { Button, Layout, FloatButton } from "antd";
import { Content, Header, Footer } from "antd/es/layout/layout";
import { MenuUnfoldOutlined, MenuFoldOutlined, SettingOutlined } from "@ant-design/icons";
import { Routes, Route, Link } from "react-router-dom";
import Solicitudes from "../Solicitudes/Solicitudes";
import DatosUsuario from "../DatosUsuario/datosusuario";
import LogoSim from "../../images/LogoSim.png";

const ScreenMain = () => {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  const toggleTheme = () => setDarkTheme(!darkTheme);

  return (
    <div className="screenmain">
      <Layout>
        <Sider
          width={200}
          collapsed={collapsed}
          collapsible
          trigger={null}
          theme={darkTheme ? "dark" : "light"}
          className="sidebar"
        >
         <Logo/>
                <Sidebar darkTheme = {darkTheme} />
                <ToggleThemeButton darkTheme= {darkTheme} toggleTheme= {toggleTheme} />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: "white",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "40px",
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
            <FloatButton.BackTop />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              backgroundImage: `url(${LogoSim})`,
              backgroundSize: 'contain', // Esto hará que la imagen se ajuste al tamaño del contenedor, manteniendo su aspecto
              backgroundPosition: 'center', // Esto centrará la imagen en el contenedor
              backgroundRepeat: 'no-repeat', // Esto evitará que la imagen se repita
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%', // Esto asegura que el contenedor ocupe todo el espacio disponible
            }}>
              <div style={{
                color: 'black',
                fontSize: '5em',
                textShadow: '-2px 0 white, 0 2px white, 2px 0 white, 0 -2px white', // Esto añade un borde a las letras
              }}>
                ¡Bienvenido al Modulo de Autoconsulta!
              </div>
            </div>



            <Routes>
              <Route path="/detallesuser" element={<DatosUsuario/>} />
              <Route path="/solicitudes" element={<Solicitudes />} />
              {/* Agrega otras rutas según sea necesario */}
            </Routes>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Empresa Telefónica ©2023
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default ScreenMain;
