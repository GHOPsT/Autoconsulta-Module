import React , { useState, useEffect } from 'react'
import axios from 'axios';
import { Card , Layout } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import './Pedidos.css'
import Logo from '../LandingPage/Sidebar/Logo.jsx';
import Sidebar from '../LandingPage/Sidebar/Sidebar.jsx';
import Sider from 'antd/es/layout/Sider.js';
import { Content, Header, Footer } from 'antd/es/layout/layout.js';
import PedidosTable from './Tables/PedidosTable'; // Asegúrate de crear este componente
const Pedidos = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [pedidos, setPedidos] = useState([]);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    const obtenerPedidos = async () => {
      try {
        const respuesta = await axios.get('/obtener-pedidos');
        setPedidos(respuesta.data.pedidos);
      } catch (error) {
        console.error('Error al obtener pedidos:', error);
      }
    };

    obtenerPedidos();
  }, []);

  return (
    <Layout>
      {/* Sidebar */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={200}
        theme="dark"
      >
        <Logo/>
        <Sidebar darkTheme={true} />
      </Sider>

      <Layout className='site-layout'>
        <Header className='site-layout-background' style={{padding: 0}}>
          {collapsed ? (
              <MenuUnfoldOutlined onClick={toggleSidebar} />
            ) : (
              <MenuFoldOutlined onClick={toggleSidebar} />
            )}
        </Header>
        <Content style={{margin: '24px 16px', padding: 24, minHeight: 280}}>
      <div className="pedidos-container">
    
      {/* Sección de Encabezado */}
      <h1>HISTORIAL DE PEDIDOS</h1>

      <Card>
      <div class='card-body'>
        <PedidosTable pedidos={pedidos} /> {/* Asegúrate de crear este componente */}
      </div>
      </Card>
    </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>
                Empresa Telefónica ©2023
    </Footer>
    </Layout>
    </Layout>
  );
}

export default Pedidos;
