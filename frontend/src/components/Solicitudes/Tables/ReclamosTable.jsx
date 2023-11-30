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
          title: 'ID Reclamos',
          dataIndex: 'id_reclamos',
          key: 'id_reclamos',
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

      ];
      


  return (



        <>
          <Table
            columns={columnsReclamos}
            dataSource={dataSourceReclamos}
            bordered={bordered}
            size={size}
            scroll={scroll}
          />
        </>
  )
}

export default ReclamosTable
