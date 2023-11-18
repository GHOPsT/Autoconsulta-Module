import { Table } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuejasTable = ({ bordered, size, scroll }) => {
  const [dataQuejas, setDataQuejas] = useState();

  const columnsQuejas = [
    {
      title: 'Fecha de Respuesta',
      dataIndex: 'fecha_respuesta',
      key: 'fecha_respuesta',
    },
    {
      title: 'ID de Queja',
      dataIndex: 'id_queja',
      key: 'id_queja',
    },
    {
      title: 'ID de Cliente',
      dataIndex: 'id_cliente',
      key: 'id_cliente',
    },
    {
      title: 'Orden de Compra',
      dataIndex: 'orden_compra',
      key: 'orden_compra',
    },
    {
      title: 'Fecha de Compra',
      dataIndex: 'fecha_compra',
      key: 'fecha_compra',
    },
    {
      title: 'Fecha de Queja',
      dataIndex: 'fecha_queja',
      key: 'fecha_queja',
    },
    {
      title: 'Petición del Cliente',
      dataIndex: 'peticion_cliente',
      key: 'peticion_cliente',
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
    },
    {
      title: 'Fecha Límite',
      dataIndex: 'fecha_limite',
      key: 'fecha_limite',
    },
    {
      title: 'Tipo de Bien Contratado',
      dataIndex: 'tipo_bien_contratado',
      key: 'tipo_bien_contratado',
    },
    {
      title: 'Código de Producto',
      dataIndex: 'codigo_producto',
      key: 'codigo_producto',
    },
    {
      title: 'Forma de Respuesta',
      dataIndex: 'forma_respuesta',
      key: 'forma_respuesta',
    },
    {
      title: 'Detalle de Queja',
      dataIndex: 'detalle_queja',
      key: 'detalle_queja',
    },
    {
      title: 'Acciones Tomadas',
      dataIndex: 'acciones_tomadas',
      key: 'acciones_tomadas',
    },
  ];

  const [showTable, setShowTable] = useState(true);

  const handleToggleTable = () => {
    setShowTable(!showTable);
  };

  useEffect(() => {
    const dniDePrueba = "25627731";

    const fetchData = async () => {
      try {
        const url = `https://api-reclamos.onrender.com/quejas/${dniDePrueba}`;
        const respuesta = await axios.get(url);
        setDataQuejas(respuesta.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
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
