import { Table , Form, Switch , Button, Input, Space , Tooltip , Tag} from 'antd';
import React , {useState , useRef} from 'react'
import Highlighter from 'react-highlight-words'
import { SearchOutlined } from '@ant-design/icons'
import './Table.css'


const GeneralTable = ({ bordered, size, scroll }) => {

  const dataGeneral = [
    {
      key: '1',
      id: 1,
      fecha_registro: '2023-11-10',
      id_empleado: 101,
      descripcion: 'Queja sobre el servicio',
      categoria: 'Queja',
    },
    {
      key: '2',
      id: 2,
      fecha_registro: '2023-11-09',
      id_empleado: 102,
      descripcion: 'Problemas con la entrega',
      categoria: 'Solicitud',
    },
    {
      key: '3',
      id: 3,
      fecha_registro: '2023-11-08',
      id_empleado: 103,
      descripcion: 'Error en la facturación',
      categoria: 'Reclamo',
    },
    {
        key: '4',
        id: 4,
        fecha_registro: '2023-10-10',
        id_empleado: 101,
        descripcion: 'Queja sobre el servicio',
        categoria: 'Queja',
      },
      {
        key: '5',
        id: 5,
        fecha_registro: '2023-09-09',
        id_empleado: 102,
        descripcion: 'Problemas con la entrega',
        categoria: 'Solicitud',
      },
      {
        key: '6',
        id: 6,
        fecha_registro: '2023-11-18',
        id_empleado: 103,
        descripcion: 'Error en la facturación',
        categoria: 'Reclamo',
      },
      {
        key: '7',
        id: 7,
        fecha_registro: '2021-11-10',
        id_empleado: 101,
        descripcion: 'Queja sobre el servicio',
        categoria: 'Queja',
      },
      {
        key: '8',
        id: 8,
        fecha_registro: '2022-12-09',
        id_empleado: 102,
        descripcion: 'Problemas con la entrega',
        categoria: 'Solicitud',
      },
      {
        key: '9',
        id: 9,
        fecha_registro: '2022-08-05',
        id_empleado: 103,
        descripcion: 'Error en la facturación',
        categoria: 'Reclamo',
      },
      {
        key: '10',
        id: 10,
        fecha_registro: '2022-02-19',
        id_empleado: 101,
        descripcion: 'Queja sobre el servicio',
        categoria: 'Queja',
      },
      {
        key: '11',
        id: 11,
        fecha_registro: '2023-11-12',
        id_empleado: 102,
        descripcion: 'Problemas con la entrega',
        categoria: 'Solicitud',
      },
      {
        key: '12',
        id: 12,
        fecha_registro: '2021-10-07',
        id_empleado: 103,
        descripcion: 'Error en la facturación',
        categoria: 'Reclamo',
      },
      {
        key: '13',
        id: 13,
        fecha_registro: '2023-11-10',
        id_empleado: 101,
        descripcion: 'Queja sobre el servicio',
        categoria: 'Queja',
      },
      {
        key: '14',
        id: 14,
        fecha_registro: '2023-11-09',
        id_empleado: 102,
        descripcion: 'Problemas con la entrega',
        categoria: 'Solicitud',
      },
      {
        key: '15',
        id: 15,
        fecha_registro: '2023-11-08',
        id_empleado: 103,
        descripcion: 'Error en la facturación',
        categoria: 'Reclamo',
      },
      {
          key: '16',
          id: 16,
          fecha_registro: '2023-10-10',
          id_empleado: 101,
          descripcion: 'Queja sobre el servicio',
          categoria: 'Queja',
        },
        {
          key: '17',
          id: 17,
          fecha_registro: '2023-09-09',
          id_empleado: 102,
          descripcion: 'Problemas con la entrega',
          categoria: 'Solicitud',
        },
        {
          key: '18',
          id: 18,
          fecha_registro: '2023-11-18',
          id_empleado: 103,
          descripcion: 'Error en la facturación',
          categoria: 'Reclamo',
        },
        {
          key: '19',
          id: 19,
          fecha_registro: '2021-11-10',
          id_empleado: 101,
          descripcion: 'Queja sobre el servicio',
          categoria: 'Queja',
        },
        {
          key: '20',
          id: 20,
          fecha_registro: '2022-12-09',
          id_empleado: 102,
          descripcion: 'Problemas con la entrega',
          categoria: 'Solicitud',
        },
        {
          key: '21',
          id: 21,
          fecha_registro: '2022-08-05',
          id_empleado: 103,
          descripcion: 'Error en la facturación',
          categoria: 'Reclamo',
        },
        {
          key: '22',
          id: 22,
          fecha_registro: '2022-02-19',
          id_empleado: 101,
          descripcion: 'Queja sobre el servicio',
          categoria: 'Queja',
        },
        {
          key: '23',
          id: 23,
          fecha_registro: '2023-11-12',
          id_empleado: 102,
          descripcion: 'Problemas con la entrega',
          categoria: 'Solicitud',
        },
        {
          key: '24',
          id: 24,
          fecha_registro: '2021-10-07',
          id_empleado: 103,
          descripcion: 'Error en la facturación',
          categoria: 'Reclamo',
        },
    
  ];

  
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [filteredData, setFilteredData] = useState(dataGeneral);
  const searchInput = useRef(null);

  const handleSearch = (value, dataIndex) => {
    setSearchText(value);
    setSearchedColumn(dataIndex);

    const filtered = dataGeneral.filter((record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
    );

    setFilteredData(filtered);
  };

  const handleReset = () => {
    setSearchText('');
    setFilteredData(dataGeneral);
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
  
  const columnsGeneral = [
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
        ...getColumnSearchProps('fecha_registro'),
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
      ...getColumnSearchProps('descripcion'),
    },
    {
      title: 'Categoría',
      dataIndex: 'categoria',
      key: 'categoria',
      filters: [
        {
          text: 'Queja',
          value: 'Queja',
        },
        {
          text: 'Solicitud',
          value: 'Solicitud',
        },
        {
          text: 'Reclamo',
          value: 'Reclamo',
        },
      ],
      onFilter: (value, record) => record.categoria.indexOf(value) === 0,
      render: (categoria) => {
        let color = categoria.length > 5 ? 'geekblue' : 'green';
        if (categoria === 'Reclamo') {
          color = 'volcano';
        }
        return (
          <Tag color={color} key={categoria}>
            {categoria.toUpperCase()}
          </Tag>
        );
      },
    },
    
  ];





  return (

    
    <div className='general-container'>
      <p>
        Este pertenece a la etiqueta p del GeneralTable
      </p>

        <div className='table-container'>
            <Table
                columns={columnsGeneral}
                dataSource={filteredData}
                bordered={bordered}
                size={size}
                scroll={scroll}
            />
        </div>

    </div>
  )
}

export default GeneralTable
