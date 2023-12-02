import { Table , Button , Input , Space , Spin} from 'antd';
import React, { useState, useEffect , useRef} from 'react';
import Highlighter from 'react-highlight-words'
import { SearchOutlined } from '@ant-design/icons'
import moment from 'moment';

import axios from 'axios';

const QuejasTable = ({ dni , bordered, size, scroll }) => {
  const [dataQuejas, setDataQuejas] = useState([]);

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [filteredData, setFilteredData] = useState(dataQuejas);
  const [loading, setLoading] = useState(true);

  const [visibleColumns, setVisibleColumns] = useState({
    id_queja: true,
    fecha_queja: true,
    prod_serv_queja: false,
    queja: true,
    comentario_queja: true,
    estado_queja: true,
  });

  

  
  const searchInput = useRef(null);

  const handleSearch = (value, dataIndex) => {
    setSearchText(value);
    setSearchedColumn(dataIndex);

    const filtered = dataQuejas.filter((record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
    );

    setFilteredData(filtered);
  };

  const handleReset = () => {
    setSearchText('');
    setFilteredData(dataQuejas);
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

  const columnsQuejas = [
    {
      title: 'ID de Queja',
      dataIndex: 'id_queja',
      key: 'id_queja',
      sorter: (a, b) => new Date(a.id_queja) - new Date(b.id_queja),
      hidden: !visibleColumns.id_queja,
    },
    {
      title: 'Fecha Queja',
      dataIndex: 'fecha_queja',
      key: 'fecha_queja',
      sorter: (a, b) => new Date(a.fecha_queja) - new Date(b.fecha_queja),
      render: (text, record) => (
        <span>{moment(text).format('DD/MM/YYYY')}</span>
      ),
      hidden: !visibleColumns.fecha_queja,
    },
    {
      title: 'Producto o Servicio',
      dataIndex: 'prod_serv_queja',
      key: 'prod_serv_queja',
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
      onFilter: (value, record) => record.prod_serv_queja.indexOf(value) === 0,
      hidden: !visibleColumns.prod_serv_queja,
    },
    {
      title: 'Queja',
      dataIndex: 'queja',
      key: 'queja',
      ...getColumnSearchProps('queja'),
      hidden: !visibleColumns.queja,
    },
    {
      title: 'Comentario',
      dataIndex: 'comentario_queja',
      key: 'comentario_queja',
      ...getColumnSearchProps('comentario_queja'),
      hidden: !visibleColumns.comentario_queja,
    },
    {
      title: 'Estado',
      dataIndex: 'estado_queja',
      key: 'estado_queja',
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
        const estado = record.estado_queja;
        
        if (value === 'empty') {
          // Filtrar los elementos con valores nulos o vacíos
          return estado === null || estado === '';
        } else {
          // Filtrar por el valor específico ('Derivado' o 'Resuelto')
          return estado && estado.indexOf(value) !== -1;
        }
      },
      hidden: !visibleColumns.estado_queja,
    },
  ];

  useEffect(() => {
    const obtenerQuejas = async () => {
      try {
        const url = `http://localhost:3002/clientes/quejas/${dni}`;
        const respuesta = await axios.get(url);
        setDataQuejas(respuesta.data.quejas);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Indicar que la carga ha terminado
      }
    };

    obtenerQuejas();
  }, []);

  const handleToggleColumn = (columnKey) => {
    setVisibleColumns((prev) => ({ ...prev, [columnKey]: !prev[columnKey] }));
  };


  return (
    <Spin spinning={loading} tip="Cargando...">
       <div style={{ marginBottom: '1rem'}}>
          <Button onClick={() => handleToggleColumn('prod_serv_queja')} >
            VER MÁS
          </Button>
      </div>

      <Table
        columns={columnsQuejas.filter((column) => !column.hidden)}
        dataSource={searchText ? filteredData : dataQuejas}
        bordered={bordered}
        size={size}
        scroll={scroll}
      />
    </Spin>
  );
};



export default QuejasTable;
