import react, {useState, useEffect} from 'react'
import axios from 'axios'
import MOCK_DATA from  "../../MOCK_DATA.json"
import {useTable, useFilters, useGlobalFilter, usePagination} from 'react-table'
import { COLUMNS } from '../../columns'
import { GlobalFilter } from '../../GlobalFilter'
import "./table.css"

import React from 'react'

export default function Table() {
    const columns = COLUMNS
    const [number, setNumber] = useState(1)
    const [data, setTableData] = useState(MOCK_DATA)

    const getData = async() => {
        try {
        let result = await axios.get(`https://swapi.dev/api/planets/?page=${number}`)
        let fetchedData = result.data.results
        setTableData(fetchedData)
        } catch (error) {
           console.error(error) 
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
      <div>
        <button onClick={() => {
            previousPage()
            if(number == 1) setNumber(1)
            else setNumber(number - 1)
        }} 
        disabled={!canPreviousPage}>
          Previous
        </button>{' '}
        <button onClick={() => {
        nextPage()
        if(number === 6) setNumber(6)
        else setNumber(number + 1)
        }
        } disabled={canNextPage}>
          Next
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {number} of {6}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type='number'
            defaultValue={1}
            onChange={e => {
              const pageNumber = e.target.value ? Number(e.target.value) : 0
              setNumber(pageNumber)
            }}
            style={{ width: '50px' }}
          />
        </span>{' '}
      </div>
    </div>
  )
}
