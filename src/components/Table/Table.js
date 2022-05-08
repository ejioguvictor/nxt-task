import react, {useState, useEffect} from 'react'
import axios from 'axios'

import React from 'react'

export default function Table() {
    const [page, setPage] = useState(1)
    const [tableData, setTableData] = useState([])

    const getData = async() => {
       let result = await axios.get(`https://swapi.dev/api/planets/?page=${page}`)
       let fetchedData = result.data.results
       console.log(fetchedData)
       setTableData(fetchedData)
    }

    useEffect(()=> {
        getData()
    },[])

  return (
    <div>Table</div>
  )
}
