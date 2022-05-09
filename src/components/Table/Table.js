import {useState, useEffect} from 'react'
import axios from 'axios'
import MOCK_DATA from  "../../MOCK_DATA.json"
import {useTable, useFilters, useGlobalFilter, usePagination} from 'react-table'
import { COLUMNS as columns} from '../../columns'
import { GlobalFilter } from '../Search/index'
import PaginationComp from "../pagination"
import "./table.css"

import React from 'react'

export default function Table() {
    // const columns = COLUMNS
    const [number, setNumber] = useState(1)
    const [data, setTableData] = useState(MOCK_DATA)
    // const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const getData = async() => {
        try {
            // setLoading(true)
        let response = await axios.get(`https://swapi.dev/api/planets/?page=${number}`)
        console.log(response)
        let fetchedData = response.data.results
        setTableData(fetchedData)
        // setLoading(false)
        setError(false)
        } catch (error) {
           setError(true) 
          //  setLoading(false)
        }    
    }

    useEffect(()=> {
        getData()
    },[number])

    const {getTableProps,getTableBodyProps,headerGroups,footerGroups,rows,prepareRow, page, nextPage, previousPage,canPreviousPage, canNextPage, pageOptions, state,gotoPage, pageCount, setPageSize, setGlobalFilter,} = useTable({columns,data, initialState: {
        pageIndex: 1
    }}, useFilters, useGlobalFilter, usePagination)

    const {pageIndex, pageSize, globalFilter} = state;

  return (
      <>
    {/* {loading ? ( <div> Loading...</div> 
     ) :  */}
     {error ? 
     <div>
         <span>Oopps, could not fetch data, Please try again!! </span>
         <button onClick={() =>  {
             setNumber(1)
             getData()
             }}>Refresh</button>

     </div>
     :
     (
    
    <div style={{marginTop:"20px"}}>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} /> 
        <table {...getTableProps()} style={{marginTop:"20px"}}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}
                </th>
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
      </table>
      <div >
      <PaginationComp getData={getData} page={number} setNumber={setNumber}/> 
      </div>
      
    </div>
    ) } 
    </>
  )
}