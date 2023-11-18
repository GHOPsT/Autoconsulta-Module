import { Table , Form, Switch } from 'antd';
import React , {useState} from 'react'
import './Table.css'


const ReclamosTable = ({ bordered, size, scroll }) => {

    const dataSourceReclamos = [
        {
          key: '1',
          id: 1,
          fecha_registro: '2023-11-10',
          id_empleado: 101,
          descripcion: 'Queja sobre el servicio',
          categoria_reclamo: 'Servicio al cliente',
          fecha_resolucion: '2023-11-15',
          nombre_servicio_producto: 'Soporte técnico',
          estado: 'derivado',
          exigencia: 'Reembolso',
        },
        {
          key: '2',
          id: 2,
          fecha_registro: '2023-11-09',
          id_empleado: 102,
          descripcion: 'Problemas con la entrega',
          categoria_reclamo: 'Logística',
          fecha_resolucion: '2023-11-12',
          nombre_servicio_producto: 'Producto A',
          estado: 'pendiente',
          exigencia: 'Envío urgente',
        },
        {
          key: '3',
          id: 3,
          fecha_registro: '2023-11-08',
          id_empleado: 103,
          descripcion: 'Error en la facturación',
          categoria_reclamo: 'Finanzas',
          fecha_resolucion: '2023-11-10',
          nombre_servicio_producto: 'Facturación',
          estado: 'finalizado',
          exigencia: 'Corrección de factura',
        },
      ];
      
      const columnsReclamos = [
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
          title: 'Categoría de Reclamo',
          dataIndex: 'categoria_reclamo',
          key: 'categoria_reclamo',
        },
        {
          title: 'Fecha de Resolución',
          dataIndex: 'fecha_resolucion',
          key: 'fecha_resolucion',
          sorter: (a, b) => new Date(a.fecha_resolucion) - new Date(b.fecha_resolucion),
        },
        {
          title: 'Nombre del Servicio o Producto',
          dataIndex: 'nombre_servicio_producto',
          key: 'nombre_servicio_producto',
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
        {
          title: 'Exigencia',
          dataIndex: 'exigencia',
          key: 'exigencia',
        },
      ];
      

  const [showTable, setShowTable] = useState(true);

  const handleToggleTable = () => {
    setShowTable(!showTable);
  };


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
