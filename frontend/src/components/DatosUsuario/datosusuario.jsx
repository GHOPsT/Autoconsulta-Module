import React, { useEffect, useState } from 'react';
import { Avatar, List, Breadcrumb, Row, Col, Card, Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { DNIContext } from '../Autoregistro/Login/DNIContext';
import Layout, { Content } from 'antd/es/layout/layout';
import Sidebar from '../LandingPage/Sidebar/Sidebar';
import Sider from "antd/es/layout/Sider";
import Logo from "../LandingPage/Sidebar/Logo";
import { FloatButton } from "antd";
import { Header, Footer } from "antd/es/layout/layout";
import { MenuUnfoldOutlined, MenuFoldOutlined, SettingOutlined } from "@ant-design/icons";
import ToggleThemeButton from "../LandingPage/Sidebar/ToggleThemeButton";

const DatosUsuario = () => {
  const { dni } = useContext(DNIContext);
  const [data, setData] = useState([]);
  const [darkTheme, setDarkTheme] = useState(true);
  const [datosPlan, setDatosPlan] = useState([]);
  const [collapsed, setCollapsed] = useState(false);

  
const toggleTheme = () => setDarkTheme(!darkTheme);

  useEffect(() => {
    const obtenerDatosUsuario = async () => {
      try {
        const url = `http://localhost:3002/usuario/${dni}`;
        const respuesta = await axios.get(url);
        const datosUsuario = respuesta.data;

        const datosFormateados = [
          { title: 'DNI', description: datosUsuario.dni },
          { title: 'Nombre', description: datosUsuario.nombre },
          { title: 'Apellidos', description: datosUsuario.apellido },
          { title: 'Fecha de Nacimiento', description: new Date(datosUsuario.fechanac).toLocaleDateString() },
          { title: 'Telefono', description: datosUsuario.telefono },
          { title: 'Correo', description: datosUsuario.correo },
          { title: 'Departamento', description: datosUsuario.departamento },
          { title: 'Distrito', description: datosUsuario.distrito }
        ];

        setData(datosFormateados);
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    obtenerDatosUsuario();
  }, []);

  useEffect(() => {
    const obtenerDatosPlan = async () => {
      try {
        
        // Luego, enviamos los datos a tu backend
        const backendUrl = `https://localhost:3002/obtener-datosplan/${dni}`; // Reemplaza esto con la URL de tu backend
        const respuestaregistro = await axios.get(backendUrl);
        const respuestaplan = respuestaregistro.data;

        setDatosPlan(respuestaplan);
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    obtenerDatosPlan();
  }, []);

  // Divide los datos en dos columnas
  const half = Math.ceil(data.length / 2);
  const data1 = data.slice(0, half);
  const data2 = data.slice(half);

  return (
    <div className="detallesuser">
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
              background: "white",
            }}
          >
            <Row gutter={16}>
              <Col span={12}>
                <List
                  itemLayout="horizontal"
                  dataSource={data1}
                  renderItem={(item, index) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />
                        }
                        title={<a href="https://ant.design">{item.title}</a>}
                        description={item.description}
                      />
                    </List.Item>
                  )}
                />
              </Col>
              <Col span={12}>
                <List
                  itemLayout="horizontal"
                  dataSource={data2}
                  renderItem={(item, index) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />
                        }
                        title={<a href="https://ant.design">{item.title}</a>}
                        description={item.description}
                      />
                    </List.Item>
                  )}
                />
              </Col>
            </Row>
            <Row gutter={16}>
              {datosPlan.map((plan, index) => (
                <Col span={8} key={index}>
                  <Card title={`Plan ${index + 1}`}>
                    <p>Número: {datosPlan.numero}</p>
                    <p>Plan: {datosPlan.plan}</p>
                    <p>Fecha de compra: {new Date(datosPlan.fecha_compra).toLocaleDateString()}</p>
                    <p>Estado: {datosPlan.estado}</p>
                  </Card>
                </Col>
              ))}
            </Row>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Empresa Telefónica ©2023
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default DatosUsuario;
