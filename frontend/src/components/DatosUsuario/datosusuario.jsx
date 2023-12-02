import React, { useEffect, useState } from 'react';
import { Avatar, List, Breadcrumb, Row, Col } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { DNIContext } from '../Autoregistro/Login/DNIContext';

const DatosUsuario = () => {
  const { dni } = useContext(DNIContext);
  const [data, setData] = useState([]);

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

  // Divide los datos en dos columnas
  const half = Math.ceil(data.length / 2);
  const data1 = data.slice(0, half);
  const data2 = data.slice(half);

  return (
    <div className="detallesuser">
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/screenmain">
            <HomeOutlined /> Inicio
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Mi Plan</Breadcrumb.Item>
      </Breadcrumb>
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
    </div>
  );
};

export default DatosUsuario;
