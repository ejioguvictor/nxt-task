import {useState, useEffect} from "react"
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
// import "./styles"
import {PaginationContainer, PaginationButton} from "./styles"

export default function PaginationComp({getData,page, setNumber}) {
    // const [page, setPage] = useState(1);
    console.log(page, "page")

    const handleChange = (event, value) => {
        event.preventDefault()
    //   setPage(value);
      setNumber(value);
      getData()
      console.log(value, "value")
    };

  return (
    <PaginationContainer>
      <PaginationButton>
    <Stack spacing={2}>
      {/* <Pagination count={10} shape="rounded" /> */}
      <Pagination count={6} variant="outlined" shape="rounded" page={page} onChange={handleChange}/>
    </Stack>
      </PaginationButton>
    </PaginationContainer>
  );
}
