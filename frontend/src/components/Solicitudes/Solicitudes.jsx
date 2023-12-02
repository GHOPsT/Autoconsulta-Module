import React, { useState } from 'react';
import DesignOptions from './DesignOptions';
import { Button, Card, Layout, Tabs , Breadcrumb} from 'antd';
import { HomeOutlined, UserOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import './Solicitudes.css';
import GeneralTable from './Tables/GeneralTable';
import QuejasTable from './Tables/QuejasTable.jsx';
import SolicitudesTable from './Tables/SolicitudesTable';
import ReclamosTable from './Tables/ReclamosTable.jsx';
import Logo from '../LandingPage/Sidebar/Logo.jsx';
import Sidebar from '../LandingPage/Sidebar/Sidebar.jsx';
import Sider from 'antd/es/layout/Sider.js';
import { Content, Header, Footer } from 'antd/es/layout/layout.js'
import axios from 'axios'

const Solicitudes = ({ dni }) => {
  const [collapsed, setCollapsed] = useState(false);


  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  <Breadcrumb
  items={[
    {
      href: '',
      title: <HomeOutlined />,
    },
    {
      href: '',
      title: (
        <>
          <UserOutlined />
          <span>Application List</span>
        </>
      ),
    },
    {
      title: 'Application',
    },
  ]}
/>

    const [bordered, setBordered] = useState(true);
    const [size, setSize] = useState('large');
    const [yScroll, setYScroll] = useState(false);
    const [xScroll, setXScroll] = useState();


    const [loadings, setLoadings] = useState([]);


    const enterLoading = async () => {
    
        // Realizar la inserción de quejas si aún no se han cargado
          const urlQuejas = `http://localhost:3002/insertar-quejas/${dni}`;
          const respuestaQuejas = await axios.get(urlQuejas);
    
          if (respuestaQuejas.data.success) {
            console.log('Inserción de quejas exitosa:', respuestaQuejas.data.message);
          } else {
            console.error('Error en la inserción de quejas:', respuestaQuejas.data.message);
          }
    
        // Realizar la inserción de reclamos si aún no se han cargado
          const urlReclamos = `http://localhost:3002/insertar-reclamos/${dni}`;
          const respuestaReclamos = await axios.get(urlReclamos);
    
          if (respuestaReclamos.data.success) {
            console.log('Inserción de reclamos exitosa:', respuestaReclamos.data.message);
          } else {
            console.error('Error en la inserción de reclamos:', respuestaReclamos.data.message);
          }
    
        // Realizar la inserción de solicitudes si aún no se han cargado
          const urlSolicitudes = `http://localhost:3002/insertar-solicitudes/${dni}`;
          const respuestaSolicitudes = await axios.get(urlSolicitudes);
    
          if (respuestaSolicitudes.data.success) {
            console.log('Inserción de solicitudes exitosa:', respuestaSolicitudes.data.message);
          } else {
            console.error('Error en la inserción de solicitudes:', respuestaSolicitudes.data.message);
          }
    };
    
    
    const [selectedTab, setSelectedTab] = useState('General');

    const handleBorderChange = (enable) => {
        setBordered(enable);
    };

    const handleSizeChange = (e) => {
        setSize(e.target.value);
    };

    const handleXScrollChange = (e) => {
        setXScroll(e.target.value);
    };

    const scroll = {};
    if (yScroll) {
        scroll.y = 240;
    }
    if (xScroll) {
        scroll.x = '100vw';
    }

    const handleTabChange = (key) => {
      setSelectedTab(key);
    };

    const renderTabContent = () => {
      switch (selectedTab) {
        case 'General':
          return <GeneralTable  dni={dni} bordered={bordered} size={size} scroll={scroll} />;
        case 'Quejas':
          return <QuejasTable dni={dni} bordered={bordered} size={size} scroll={scroll} />;
        case 'Solicitudes':
          return <SolicitudesTable dni={dni} bordered={bordered} size={size} scroll={scroll} />;
        case 'Reclamos':
          return <ReclamosTable dni={dni} bordered={bordered} size={size} scroll={scroll} />;
        default:
          return null;
      }
    }

    
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
      <div className="solicitudes-container">
    
      {/* Sección de Encabezado */}
      <h1>HISTORIAL DE SOLICITUDES</h1>

      <div className="panel-container">
          {/* Sección de Opciones de Diseño */}
          <div className="options-container">
              <h2>Opciones de diseño:</h2>
              <DesignOptions
                bordered={bordered}
                size={size}
                yScroll={yScroll}
                xScroll={xScroll}
                onBorderChange={handleBorderChange}
                onSizeChange={handleSizeChange}
                onXScrollChange={handleXScrollChange}
              />
            </div>

          {/*Seccion del boton de update*/}
            <div className="update-container">
            <Button type="primary" loading={loadings[0]} onClick={() => enterLoading()}>
                Actualizar datos
            </Button>

            </div>

      </div>
      
      <Card>
      <div class='card-body'>

          <Tabs
            defaultActiveKey="General"
            size={size}
            style={{ marginBottom: 32 }}
            onChange={handleTabChange}
          >
            <Tabs.TabPane tab="General" key="General" />
            <Tabs.TabPane tab="Quejas" key="Quejas" />
            <Tabs.TabPane tab="Solicitudes" key="Solicitudes" />
            <Tabs.TabPane tab="Reclamos" key="Reclamos" />
          </Tabs>
        {renderTabContent()}
      </div>
      </Card>
    </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>
                Empresa Telefónica ©2023
    </Footer>
    </Layout>
    </Layout>
    )
}

export default Solicitudes