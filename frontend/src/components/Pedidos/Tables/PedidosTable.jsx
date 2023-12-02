import { Table } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PedidosTable = ({ bordered, size, scroll }) => {
  const [dataPedidos, setDataPedidos] = useState([]);

  const columnsPedidos = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
        title: 'Descripción',
        dataIndex: 'descripcion',
        key: 'descripcion',
    },
    {
      title: 'Fecha',
      dataIndex: 'fecha',
      key: 'fecha',
    },
    {
      title: 'Estado Actual',
      dataIndex: 'estado_actual',
      key: 'estado_actual',
    },
  ];

  useEffect(() => {
    const obtenerPedidos = async () => {
        try {
          const url = 'http://localhost:3002/obtener-pedidos'; // Asegúrate de usar la URL correcta
          const respuesta = await axios.get(url);
          setDataPedidos(respuesta.data.pedidos);
        } catch (error) {
          console.log(error);
        }
      };

    // Llamada a la función para obtener pedidos al montar el componente
    obtenerPedidos();
  }, []); // Se ejecutará solo una vez al montar el componente

  return (
    <>
      <Table
        columns={columnsPedidos}
        dataSource={dataPedidos}
        bordered={bordered}
        size={size}
        scroll={scroll}
      />
    </>
  );
};

export default PedidosTable;
