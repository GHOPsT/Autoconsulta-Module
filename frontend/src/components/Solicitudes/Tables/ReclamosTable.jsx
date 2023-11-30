import { Table } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './Table.css'


const ReclamosTable = ({ bordered, size, scroll }) => {

      const [dataReclamos, setDataReclamos] = useState([]);

      const columnsReclamos = [
        {
          title: 'DNI',
          dataIndex: 'dni',
          key: 'dni',
        },
        {
          title: 'ID Reclamo',
          dataIndex: 'id_reclamo',
          key: 'id_reclamo',
        },
        {
          title: 'Fecha Reclamo',
          dataIndex: 'fecha_reclamo',
          key: 'fecha_reclamo',
        },
        {
          title: 'Reclamo',
          dataIndex: 'reclamo',
          key: 'reclamo',
        },
        {
          title: 'Comentario',
          dataIndex: 'comentario',
          key: 'comentario',
        },
        {
          title: 'Monto',
          dataIndex: 'monto',
          key: 'monto',
        },
        {
          title: 'Estado',
          dataIndex: 'estado',
          key: 'estado',
        },
        {
          title: 'Producto o Servicio',
          dataIndex: 'prod_serv',
          key: 'prod_serv',
        },
        {
          title: 'Fecha de Respuesta',
          dataIndex: 'fecha_respuesta',
          key: 'fecha_respuesta',
        },
      ];

      useEffect(() => {
        const obtenerReclamos = async () => {
          try {
            // Obtener el DNI de algún lugar, puedes pasarlo como prop o desde el estado
            const dni = '99887766';
            const url = `http://localhost:3002/clientes/reclamos/${dni}`;
            const respuesta = await axios.get(url);
            setDataReclamos(respuesta.data.reclamos);
          } catch (error) {
            console.log(error);
          }
        };
    
        // Llamada a la función para obtener quejas al montar el componente
        obtenerReclamos();
      }, []); // Se ejecutará solo una vez al montar el componente
      


  return (



        <>
          <Table
            columns={columnsReclamos}
            dataSource={dataReclamos}
            bordered={bordered}
            size={size}
            scroll={scroll}
          />
        </>
  )
}

export default ReclamosTable
