import { Table , Form, Switch } from 'antd';
import React , {useState} from 'react'
import './Table.css'

const SolicitudesTable = ({ bordered, size, scroll }) => {

    const dataSourceSolicitudes = [
        {
          key: '1',
          id: 1,
          fecha_registro: '2023-11-10',
          id_empleado: 101,
          descripcion: 'Queja sobre el servicio',
          categoria_solicitud: 'Servicio al cliente',
          fecha_resolucion: '2023-11-15',
          estado: 'finalizado',
        },
        {
          key: '2',
          id: 2,
          fecha_registro: '2023-11-09',
          id_empleado: 102,
          descripcion: 'Problemas con la entrega',
          categoria_solicitud: 'Logística',
          fecha_resolucion: '2023-11-12',
          estado: 'derivado',
        },
        {
          key: '3',
          id: 3,
          fecha_registro: '2023-11-08',
          id_empleado: 103,
          descripcion: 'Error en la facturación',
          categoria_solicitud: 'Finanzas',
          fecha_resolucion: '2023-11-20',
          estado: 'pendiente',
        },
      ];
      
      
      const columnsSolicitudes = [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Fecha de Registro',
          dataIndex: 'fecha_registro',
          key: 'fecha_registro',
          sorter: (a, b) => new Date(a.fecha_registro) - new Date(b.fecha_registro),

        },
        {
          title: 'ID Empleado',
          dataIndex: 'id_empleado',
          key: 'id_empleado',
        },
        {
          title: 'Descripción',
          dataIndex: 'descripcion',
          key: 'descripcion',
        },
        {
          title: 'Categoría de Solicitud',
          dataIndex: 'categoria_solicitud',
          key: 'categoria_solicitud',
        },
        {
          title: 'Fecha de Resolución',
          dataIndex: 'fecha_resolucion',
          key: 'fecha_resolucion',
          sorter: (a, b) => new Date(a.fecha_resolucion) - new Date(b.fecha_resolucion),  
        },
        {
          title: 'Estado',
          dataIndex: 'estado',
          key: 'estado',
          filters: [
            {
              text: 'Derivado',
              value: 'derivado',
            },
            {
              text: 'Pendiente',
              value: 'pendiente',
            },
            {
                text: 'Finalizado',
                value: 'finalizado',
              },
          ],
          onFilter: (value, record) => record.estado.indexOf(value) === 0,
        },
      ];
      
      

  const [showTable, setShowTable] = useState(true);

  const handleToggleTable = () => {
    setShowTable(!showTable);
  };


  return (
    <>
        <Table
          columns={columnsSolicitudes}
          dataSource={dataSourceSolicitudes}
          bordered={bordered}
          size={size}
          scroll={scroll}
        />

    </>
  )
}

export default SolicitudesTable
