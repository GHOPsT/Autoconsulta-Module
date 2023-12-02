import { Table , Spin} from 'antd';
import React , {useState , useEffect} from 'react'

import moment from 'moment';


import axios from 'axios'
import './Table.css'


const GeneralTable = ({ dni, bordered, size, scroll }) => {

  const [dataGeneral, setDataGeneral] = useState([]);

  const [loading, setLoading] = useState(true);

 
  const columnsGeneral = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => {
        const tipo = record.tipo;
    
        if (tipo === 'Reclamo') {
          return record.id_reclamo;
        } else if (tipo === 'Solicitud') {
          return record.id_solicitud;
        } else if (tipo === 'Queja') {
          return record.id_queja;
        } else {
          return 'N/A';
        }
      },
      sorter: (a, b) => {
        const tipoA = a.tipo;
        const tipoB = b.tipo;
        const idA = a[`id_${tipoA.toLowerCase()}`];
        const idB = b[`id_${tipoB.toLowerCase()}`];
    
        return idA - idB;
      },
    },
    
    {
      title: 'Fecha Proceso',
      dataIndex: 'fecha_proceso',
      key: 'fecha_proceso',
      render: (text, record) => {
        const tipo = record.tipo;
    
        let fecha;
        if (tipo === 'Reclamo') {
          fecha = record.fecha_reclamo;
        } else if (tipo === 'Solicitud') {
          fecha = record.fecha_solicitud;
        } else if (tipo === 'Queja') {
          fecha = record.fecha_queja;
        } else {
          fecha = null;
        }
    
        return fecha ? moment(fecha).format('DD/MM/YYYY') : 'N/A';
      },
      sorter: (a, b) => {
        const tipoA = a.tipo;
        const tipoB = b.tipo;
        const fechaA = a[`fecha_${tipoA.toLowerCase()}`];
        const fechaB = b[`fecha_${tipoB.toLowerCase()}`];
    
        return moment(fechaA).valueOf() - moment(fechaB).valueOf();
      },
    },

    {
      title: 'Descripcion',
      dataIndex: 'descripcion',
      key: 'descripcion',
      render: (text, record) => {
        // Asegúrate de que la propiedad 'tipo' esté presente en tu objeto de datos
        const tipo = record.tipo;
        
        // Dependiendo del tipo, muestra el ID correspondiente
        if (tipo === 'Reclamo') {
          return record.reclamo;
        } else if (tipo === 'Solicitud') {
          return record.solicitud;
        } else if (tipo === 'Queja') {
          return record.queja;
        } else {
          return 'N/A'; // O algo más si no hay un tipo válido
        }
      },
    },
    {
      title: 'Categoria',
      dataIndex: 'categoria',
      key: 'categoria',
      
      render: (text, record) => {
        // Asegúrate de que la propiedad 'tipo' esté presente en tu objeto de datos
        const tipo = record.tipo;
        
        // Dependiendo del tipo, muestra el ID correspondiente
        if (tipo === 'Reclamo') {
          return 'Reclamo';
        } else if (tipo === 'Solicitud') {
          return 'Solicitud';
        } else if (tipo === 'Queja') {
          return 'Queja';
        } else {
          return 'N/A'; // O algo más si no hay un tipo válido
        }
      },
      filters: [
        {
          text: 'Reclamo',
          value: 'Reclamo',
        },
        {
          text: 'Solicitud',
          value: 'Solicitud',
        },
        {
          text: 'Queja',
          value: 'Queja',
        }
      ],
      onFilter: (value, record) => {
        const tipo = record.tipo;
        // Filtrar por el valor específico ('Reclamo', 'Solicitud' o 'Queja')
        return tipo === value;
      },
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
      render: (text, record) => {
        // Asegúrate de que la propiedad 'tipo' esté presente en tu objeto de datos
        const tipo = record.tipo;
        
        // Dependiendo del tipo, muestra el estado correspondiente
        if (tipo === 'Reclamo') {
          return record.estado_reclamo;
        } else if (tipo === 'Solicitud') {
          return record.estado_solicitud;
        } else if (tipo === 'Queja') {
          return record.estado_queja;
        } else {
          return 'N/A'; // O algo más si no hay un tipo válido
        }
      },
      filters: [
        {
          text: 'Derivado',
          value: 'derivado',
        },
        {
          text: 'Resuelto',
          value: 'resuelto',
        },
        {
          text: 'Vacío',
          value: 'empty',
        },
      ],
      onFilter: (value, record) => {
        const tipo = record.tipo;
        
        if (value === 'empty') {
          // Filtrar los elementos con valores nulos o vacíos
          return (
            (tipo === 'Reclamo' && (record.estado_reclamo === null || record.estado_reclamo === '')) ||
            (tipo === 'Solicitud' && (record.estado_solicitud === null || record.estado_solicitud === '')) ||
            (tipo === 'Queja' && (record.estado_queja === null || record.estado_queja === ''))
          );
        } else {
          // Filtrar por el valor específico ('Derivado' o 'Resuelto')
          return (
            (tipo === 'Reclamo' && record.estado_reclamo === value) ||
            (tipo === 'Solicitud' && record.estado_solicitud === value) ||
            (tipo === 'Queja' && record.estado_queja === value)
          );
        }
      },
    }
    
    
    
  ];



  useEffect(() => {
    const obtenerInformacionGeneral = async () => {
      try {
        const url = `http://localhost:3002/clientes/general/${dni}`;
        const respuesta = await axios.get(url);
  
        if (respuesta.data.success) {
          setDataGeneral(respuesta.data.informacionGeneral);
        } else {
          console.error(respuesta.data.message || 'Error desconocido'); // Imprime un mensaje de error
          setDataGeneral([]); // Manejo del caso de error
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  
    obtenerInformacionGeneral();
  }, []);
  
  
  
  

  return (
    <Spin spinning={loading} tip="Cargando...">
        <Table
            columns={columnsGeneral}
            dataSource={dataGeneral}
            bordered={bordered}
            size={size}
            scroll={scroll}
        />
    </Spin>
    
  )
}

export default GeneralTable
