import react, {useState, useEffect} from 'react'
import axios from 'axios'
import MOCK_DATA from  "../../MOCK_DATA.json"
import {useTable} from 'react-table'
import { COLUMNS } from '../../columns'

import React from 'react'

export default function Table() {
    const columns = COLUMNS
    const [page, setPage] = useState(1)
    const [data, setTableData] = useState(MOCK_DATA)

    const getData = async() => {
        try {
        let result = await axios.get(`https://swapi.dev/api/planets/?page=${page}`)
        let fetchedData = result.data.results
        setTableData(fetchedData)
        } catch (error) {
           console.error(error) 
        }
       
    }

    useEffect(()=> {
        getData()
    },[])

    const {getTableProps,getTableBodyProps,headerGroups,footerGroups,rows,prepareRow} = useTable({columns,data})

  return (
    <div>
        <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}> {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          {footerGroups.map(footerGroup => (
            <tr {...footerGroup.getFooterGroupProps()}>
              {footerGroup.headers.map(column => (
                <td {...column.getFooterProps()}>{column.render('Footer')}</td>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  )
}
