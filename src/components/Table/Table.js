import {useState, useEffect} from 'react'
import axios from 'axios'
import MOCK_DATA from  "../../MOCK_DATA.json"
import {useTable} from 'react-table'
import { COLUMNS as columns} from '../../columns'
import { GlobalFilter } from '../Search/index'
import PaginationComp from "../pagination"
import {TailSpin} from "react-loader-spinner"
import "./table.css"

export default function Table() {
    const [number, setNumber] = useState(1)
    const [data, setTableData] = useState(MOCK_DATA)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const getData = async() => {
        try {
          setLoading(true)
        let response = await axios.get(`https://swapi.dev/api/planets/?page=${number}`)
        console.log(response)
        let fetchedData = response.data.results
        setTableData(fetchedData)
        setError(false)
        setLoading(false)
        } catch (error) {
           setError(true) 
           setLoading(false)
        }    
    }

    useEffect(()=> {
        getData()
        // eslint-disable-next-line 
    },[number])

    const {getTableProps,getTableBodyProps,headerGroups,rows,prepareRow, state, setGlobalFilter,} = useTable({columns,data})

    const { globalFilter} = state;

  return (
      <>

     {error ? <div>
         <span>Oopps, could not fetch data, Please try again!! </span>
         <button onClick={() =>  {
             setNumber(1)
             getData()
             }}>Refresh</button>
            </div>
     :
     (
    
    <div style={{marginTop:"20px"}}>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/> 
        { loading ? <div className="loader">
          <TailSpin ariaLabel="loading-indicator" />
          </div>
        :
        <div> 
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
              <tr {...row.getRowProps()}>{row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
        </table>
        <PaginationComp getData={getData} page={number} setNumber={setNumber}/> 
        </div>
        }
    </div>
    )} 
    </>
  )
}