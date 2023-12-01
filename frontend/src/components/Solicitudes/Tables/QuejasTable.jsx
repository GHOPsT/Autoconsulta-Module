import { Table } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuejasTable = ({ bordered, size, scroll }) => {
  const [dataQuejas, setDataQuejas] = useState([]);

  const columnsQuejas = [
    {
      title: 'Dni',
      dataIndex: 'dni',
      key: 'dni',
    },
    {
      title: 'ID de Queja',
      dataIndex: 'id_queja',
      key: 'id_queja',
    },
    {
      title: 'Fecha de Queja',
      dataIndex: 'fecha_queja',
      key: 'fecha_queja',
    },
    {
      title: 'Producto o Servicio',
      dataIndex: 'prod_serv',
      key: 'prod_serv',
    },
    {
      title: 'Queja',
      dataIndex: 'queja',
      key: 'queja',
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
    const obtenerQuejas = async () => {
      try {
        // Obtener el DNI de algún lugar, puedes pasarlo como prop o desde el estado
        const dni = '33445566';
        const url = `http://localhost:3002/clientes/quejas/${dni}`;
        const respuesta = await axios.get(url);
        setDataQuejas(respuesta.data.quejas);
      } catch (error) {
        console.log(error);
      }
    };

    // Llamada a la función para obtener quejas al montar el componente
    obtenerQuejas();
  }, []); // Se ejecutará solo una vez al montar el componente

  return (
    <>
      <Table
        columns={columnsQuejas}
        dataSource={dataQuejas}
        bordered={bordered}
        size={size}
        scroll={scroll}
      />
    </>
  );
};

export default QuejasTable;
