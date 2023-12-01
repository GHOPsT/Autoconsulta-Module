import React, { useEffect, useState } from 'react';
import { Avatar, List, Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DatosUsuario = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const obtenerDatosUsuario = async () => {
      try {
        const dni = '12345678'; // Aquí debes poner el DNI del usuario que está ingresando
        const url = `http://localhost:3002/usuario/${dni}`;
        const respuesta = await axios.get(url);
        const datosUsuario = respuesta.data;

        // Aquí puedes formatear los datos del usuario para que se ajusten al formato de tu lista
        const datosFormateados = [
          { title: 'DNI', description: datosUsuario.dni },
          { title: 'Usuario', description: datosUsuario.usuario },
          { title: 'Nombre', description: datosUsuario.nombre },
          // Agrega aquí el resto de los datos del usuario
        ];

        setData(datosFormateados);
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    obtenerDatosUsuario();
  }, []);

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
      <List
        itemLayout="horizontal"
        dataSource={data}
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
    </div>
  );
};

export default DatosUsuario;
