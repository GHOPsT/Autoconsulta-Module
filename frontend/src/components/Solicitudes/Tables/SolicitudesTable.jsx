import { Table } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './Table.css'

const SolicitudesTable = ({ bordered, size, scroll }) => {

  const [dataSolicitudes, setDataSolicitudes] = useState([]);
      
      const columnsSolicitudes = [
        {
          title: 'DNI',
          dataIndex: 'dni',
          key: 'dni',
        },
        {
          title: 'Id Solicitud',
          dataIndex: 'id_solicitud',
          key: 'id_solicitud',
        },
        {
          title: 'Fecha solicitud',
          dataIndex: 'fecha_solicitud',
          key: 'fecha_solicitud',
        },
        {
          title: 'Producto o Servicio',
          dataIndex: 'prod_serv',
          key: 'prod_serv',
        },
        {
          title: 'Tipo de Solicitud',
          dataIndex: 'tipo_solicitud',
          key: 'tipo_solicitud',
        },
        {
          title: 'Solicitud',
          dataIndex: 'solicitud',
          key: 'solicitud',
        },
        {
          title: 'Comentario',
          dataIndex: 'comentario',
          key: 'comentario',
        },
        {
          title: 'Estado',
          dataIndex: 'estado',
          key: 'estado',
        },
      ];


      useEffect(() => {
        const obtenerSolicitudes = async () => {
          try {
            // Obtener el DNI de algún lugar, puedes pasarlo como prop o desde el estado
            const dni = '78901211';
            const url = `http://localhost:3002/clientes/solicitudes/${dni}`;
            const respuesta = await axios.get(url);
            setDataSolicitudes(respuesta.data.solicitudes);
          } catch (error) {
            console.log(error);
          }
        };
    
        // Llamada a la función para obtener quejas al montar el componente
        obtenerSolicitudes();
      }, []); // Se ejecutará solo una vez al montar el componente
      
  return (
    <>
        <Table
          columns={columnsSolicitudes}
          dataSource={dataSolicitudes}
          bordered={bordered}
          size={size}
          scroll={scroll}
        />

    </>
  )
}

export default SolicitudesTable
