import { Table , Button , Input , Space , Spin } from 'antd';
import React, { useState, useEffect , useRef} from 'react';
import Highlighter from 'react-highlight-words'
import { SearchOutlined } from '@ant-design/icons'
import moment from 'moment';

import axios from 'axios';
import './Table.css';




const SolicitudesTable = ({ bordered, size, scroll }) => {
  const [dataSolicitudes, setDataSolicitudes] = useState([]);


  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [filteredData, setFilteredData] = useState(dataSolicitudes);
  const [loading, setLoading] = useState(true);

  const [visibleColumns, setVisibleColumns] = useState({
    id_solicitud: true,
    fecha_solicitud: true,
    prod_serv_solicitud: false,
    tipo_solicitud: false,
    solicitud: true,
    comentario_solicitud: true,
    estado_solicitud: true,
  });

 
  const searchInput = useRef(null);

  const handleSearch = (value, dataIndex) => {
    setSearchText(value);
    setSearchedColumn(dataIndex);

    const filtered = dataSolicitudes.filter((record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
    );

    setFilteredData(filtered);
  };

  const handleReset = () => {
    setSearchText('');
    setFilteredData(dataSolicitudes);
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

  const columnsSolicitudes = [
    {
      title: 'ID Solicitud',
      dataIndex: 'id_solicitud',
      key: 'id_solicitud',
      sorter: (a, b) => new Date(a.id_solicitud) - new Date(b.id_solicitud),
      hidden: !visibleColumns.id_solicitud,
    },
    {
      title: 'Fecha Solicitud',
      dataIndex: 'fecha_solicitud',
      key: 'fecha_solicitud',
      sorter: (a, b) => new Date(a.fecha_solicitud) - new Date(b.fecha_solicitud),

      render: (text, record) => (
        <span>{moment(text).format('DD/MM/YYYY')}</span>
      ),
      hidden: !visibleColumns.fecha_solicitud,
    },
    {
      title: 'Producto o Servicio',
      dataIndex: 'prod_serv_solicitud',
      key: 'prod_serv_solicitud',
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
      onFilter: (value, record) => record.prod_serv_solicitud.indexOf(value) === 0,
      hidden: !visibleColumns.prod_serv_solicitud,
    },
    {
      title: 'Tipo de Solicitud',
      dataIndex: 'tipo_solicitud',
      key: 'tipo_solicitud',
      ...getColumnSearchProps('tipo_solicitud'),
      hidden: !visibleColumns.tipo_solicitud,
    },
    {
      title: 'Solicitud',
      dataIndex: 'solicitud',
      key: 'solicitud',
      ...getColumnSearchProps('solicitud'),
      hidden: !visibleColumns.solicitud,
    },
    {
      title: 'Comentario',
      dataIndex: 'comentario_solicitud',
      key: 'comentario_solicitud',
      ...getColumnSearchProps('comentario_solicitud'),
      hidden: !visibleColumns.comentario_solicitud,
    },
    {
      title: 'Estado',
      dataIndex: 'estado_solicitud',
      key: 'estado_solicitud',
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
      onFilter: (value, record) => record.estado_solicitud.indexOf(value) === 0,
      hidden: !visibleColumns.estado_solicitud,
    },
  ];
  

  useEffect(() => {
    const obtenerSolicitudes = async () => {
      try {
        const dni = '78901211';
        const url = `http://localhost:3002/clientes/solicitudes/${dni}`;
        const respuesta = await axios.get(url);
        setDataSolicitudes(respuesta.data.solicitudes);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    obtenerSolicitudes();
  }, []);

  const handleToggleColumn = (columnKeys) => {
    setVisibleColumns((prev) => {
      const updatedColumns = { ...prev };
      columnKeys.forEach((key) => {
        updatedColumns[key] = !updatedColumns[key];
      });
      return updatedColumns;
    });
  };
  

  return (

    <Spin spinning={loading} tip="Cargando...">
      <div style={{ marginBottom: '1rem'}}>
      <Button onClick={() => handleToggleColumn(['prod_serv_solicitud', 'tipo_solicitud'])}>
          VER MÁS
      </Button>


      </div>

      <Table
          columns={columnsSolicitudes.filter((column) => !column.hidden)}
          dataSource={searchText ? filteredData : dataSolicitudes}
          bordered={bordered}
          size={size}
          scroll={scroll}
      />
    </Spin>
        
  );
};

export default SolicitudesTable;
