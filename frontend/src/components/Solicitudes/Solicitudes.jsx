import React , {useState  , useEffect} from 'react'
import {useTable} from 'react-table'

import '../../App.css'

// import Axios from 'axios'


const Solicitudes = () => {
    const [columns , setColumns ] = useState([])
    const [data, setData] = useState([])


    useEffect(() => {
        // Obtener las columnas 

    })

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable({
        columns: columns, 
        data: data,
      })

    return (
        <div>
            <h1>Contenido del componente Reclamos</h1>
            <h2>Tabla de Reclamos</h2>

            {/* <table {...getTableProps ()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map( (column) => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                ))}
                        </tr>
                    ))}
                </thead>

                <tbody {... getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row)
                    return(
                        <tr {...row.getRowProps()}>
                            {
                                row.cells.map((cell) => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                        </tr>                   
                    )
                })}
                </tbody>
            </table> */}

        </div>
    )
}

export default Solicitudes