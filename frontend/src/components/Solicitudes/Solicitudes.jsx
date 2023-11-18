import React , { useState } from 'react'
import DesignOptions from './DesignOptions';
import { Card, Table , Segmented , Tabs} from 'antd';

import { Breadcrumb } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';

import { Link } from 'react-router-dom';


import './Solicitudes.css'
import GeneralTable from './Tables/GeneralTable';
import QuejasTable from './Tables/QuejasTable';
import ReclamosTable from './Tables/ReclamosTable';
import SolicitudesTable from './Tables/SolicitudesTable';


import axios from 'axios'





const Solicitudes = () => {

  
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
          return <GeneralTable bordered={bordered} size={size} scroll={scroll} />;
        case 'Quejas':
          return <QuejasTable bordered={bordered} size={size} scroll={scroll} />;
        case 'Solicitudes':
          return <SolicitudesTable bordered={bordered} size={size} scroll={scroll} />;
        case 'Reclamos':
          return <ReclamosTable bordered={bordered} size={size} scroll={scroll} />;
        default:
          return null;
      }
    }

    
    return (
      <div className="solicitudes-container">

      {/* Breadcrumb */}
      <Breadcrumb>
          <Breadcrumb.Item>
              <Link to="/dashboard"> <HomeOutlined />  Inicio </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Historial</Breadcrumb.Item>
          <Breadcrumb.Item>Solicitudes</Breadcrumb.Item>
      </Breadcrumb>

      {/* Sección de Encabezado */}
      <h1>HISTORIAL DE SOLICITUDES</h1>

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
    )
}

export default Solicitudes