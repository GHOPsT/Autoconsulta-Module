import { Table , Button , Input , Space , Spin} from 'antd';
import React, { useState, useEffect , useRef} from 'react';
import Highlighter from 'react-highlight-words'
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';
import * as XLSX from 'xlsx';


import './Table.css'


const ReclamosTable = ({ dni, bordered, size, scroll }) => {

  const [dataReclamos, setDataReclamos] = useState([]);


  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [filteredData, setFilteredData] = useState(dataReclamos);
  const [loading, setLoading] = useState(true);

  const [visibleColumns, setVisibleColumns] = useState({
    id_reclamo: true,
    fecha_reclamo: true,
    prod_serv_reclamo: false,
    tipo_reclamo: false,
    reclamo: true,
    comentario_reclamo: true,
    monto: true,
    estado_reclamo: true,
    fecha_respuesta_reclamo: false,
    area_asignada_reclamo: false,
  });


  const searchInput = useRef(null);

  const handleSearch = (value, dataIndex) => {
    setSearchText(value);
    setSearchedColumn(dataIndex);

    const filtered = dataReclamos.filter((record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
    );

    setFilteredData(filtered);
  };

  const handleReset = () => {
    setSearchText('');
    setFilteredData(dataReclamos);
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Ingresar busqueda`}
          value={selectedKeys[0]}
          onChange={(e) => {
            const value = e.target.value;
            setSelectedKeys(value ? [value] : []);
            handleSearch(value, dataIndex);
          }}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            onClick={() => {
              clearFilters();
              handleReset();
            }}
            size="small"
            style={{
              width: 90,
            }}
          >
            Borrar
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Cerrar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) => (
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      )
    ),
  });

      const columnsReclamos = [
        {
          title: 'ID Reclamo',
          dataIndex: 'id_reclamo',
          key: 'id_reclamo',
          sorter: (a, b) => new Date(a.id_reeclamo) - new Date(b.id_reclamo),
          hidden: !visibleColumns.id_reclamo,

        },
        {
          title: 'Fecha Reclamo',
          dataIndex: 'fecha_reclamo',
          key: 'fecha_reclamo',
          sorter: (a, b) => new Date(a.fecha_reclamo) - new Date(b.fecha_reclamo),

          render: (text, record) => (
            <span>{moment(text).format('DD/MM/YYYY')}</span>
          ),
          hidden: !visibleColumns.fecha_reclamo,
        },
        {
          title: 'Producto o Servicio',
          dataIndex: 'prod_serv_reclamo',
          key: 'prod_serv_reclamo',
          filters: [
            {
              text: 'Producto',
              value: 'producto',
            },
            {
              text: 'Servicio',
              value: 'servicio',
            },
          ],
          onFilter: (value, record) => record.prod_serv_reclamo.indexOf(value) === 0,
          hidden: !visibleColumns.prod_serv_reclamo,
        },
        {
          title: 'Tipo Reclamo',
          dataIndex: 'tipo_reclamo',
          key: 'tipo_reclamo',
          ...getColumnSearchProps('tipo_reclamo'),
          hidden: !visibleColumns.tipo_reclamo,
        },
        {
          title: 'Reclamo',
          dataIndex: 'reclamo',
          key: 'reclamo',
          ...getColumnSearchProps('reclamo'),
          hidden: !visibleColumns.reclamo,
        },
        {
          title: 'Comentario',
          dataIndex: 'comentario_reclamo',
          key: 'comentario_reclamo',
          ...getColumnSearchProps('comentario_reclamo'),
          hidden: !visibleColumns.comentario_reclamo,
        },
        {
          title: 'Monto (S/.)',
          dataIndex: 'monto',
          key: 'monto',
          sorter: (a, b) => new Date(a.monto) - new Date(b.monto),
          hidden: !visibleColumns.monto,
        },
        {
          title: 'Estado',
          dataIndex: 'estado_reclamo',
          key: 'estado_reclamo',
          filters: [
            {
              text: 'Derivado',
              value: 'derivado',
            },
            {
              text: 'Resuelto',
              value: 'resuelto',
            },
          ],
          onFilter: (value, record) => record.estado_reclamo.indexOf(value) === 0,
          hidden: !visibleColumns.estado_reclamo,
        },
        {
          title: 'Fecha de Respuesta',
          dataIndex: 'fecha_respuesta_reclamo',
          key: 'fecha_respuesta_reclamo',
          sorter: (a, b) => new Date(a.fecha_respuesta_reclamo) - new Date(b.fecha_respuesta_reclamo),

          render: (text, record) => (
            <span>{moment(text).format('DD/MM/YYYY')}</span>
          ),
          hidden: !visibleColumns.fecha_respuesta_reclamo,
        },
        {
          title: 'Area derivada',
          dataIndex: 'area_asignada_reclamo',
          key: 'area_asignada_reclamo',
          filters: [
            {
              text: 'Clientes',
              value: 'Clientes',
            },
            {
              text: 'Ventas',
              value: 'Ventas',
            },
            {
              text: 'Reclamos, Solicitudes y Quejas',
              value: 'Reclamos, Solicitudes y Quejas',
            },
            {
              text: 'Reparaciones',
              value: 'Reparaciones',
            },
            {
              text: 'Marketing',
              value: 'Marketing',
            },
            {
              text: 'Autoconsulta',
              value: 'Autoconsulta',
            },
          ],
          onFilter: (value, record) => record.area_asignada_reclamo.indexOf(value) === 0,
          hidden: !visibleColumns.area_asignada_reclamo,
        },
        
      ];

      
      useEffect(() => {
        const obtenerReclamos = async () => {
          try {
            const url = `http://localhost:3002/clientes/reclamos/${dni}`;
            const respuesta = await axios.get(url);
            setDataReclamos(respuesta.data.reclamos);
          } catch (error) {
            console.log(error);
          } finally {
            setLoading(false);
          }
        };
    
        // Llamada a la función para obtener quejas al montar el componente
        obtenerReclamos();
      }, []); // Se ejecutará solo una vez al montar el componente


      const handleToggleColumn = (columnKeys) => {
        setVisibleColumns((prev) => {
          const updatedColumns = { ...prev };
          columnKeys.forEach((key) => {
            updatedColumns[key] = !updatedColumns[key];
          });
          return updatedColumns;
        });
      };

      const exportToExcel = () => {
        const columnsToExport = columnsReclamos.filter((column) => !column.hidden);
        const dataToExport = searchText ? filteredData : dataReclamos;
      
        const exportData = [columnsToExport.map(column => column.title), ...dataToExport.map(row =>
          columnsToExport.map(column => row[column.dataIndex])
        )];
      
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet(exportData);
      
        XLSX.utils.book_append_sheet(workbook, worksheet, 'ReclamosData');
      
        XLSX.writeFile(workbook, 'reclamos_data.xlsx');
      };



  return (

    <Spin spinning={loading} tip="Cargando...">

      <div style={{ marginBottom: '1rem' }}>

          <Button onClick={() => handleToggleColumn(['prod_serv_reclamo', 'tipo_reclamo','fecha_respuesta_reclamo','area_asignada_reclamo'])}>
            VER MÁS
          </Button>

          <div style={{ display: 'inline-block', marginLeft: '1rem' }}>
            <Button onClick={exportToExcel}>
              Exportar a Excel
            </Button>
          </div>
      </div>


      <Table
        columns={columnsReclamos.filter((column) => !column.hidden)}
        dataSource={searchText ? filteredData : dataReclamos}
        bordered={bordered}
        size={size}
        scroll={scroll}
      />
    </Spin>
  )
}

export default ReclamosTable
