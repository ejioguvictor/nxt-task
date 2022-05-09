import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {PaginationContainer, PaginationButton} from "./styles"

export default function PaginationComp({getData,page, setNumber}) {

    const handleChange = (event, value) => {
        event.preventDefault()
      setNumber(value);
      getData()
    };

  return (
    <PaginationContainer>
      <PaginationButton>
    <Stack spacing={2}>
      <Pagination count={6} variant="none" shape="rounded" page={page} onChange={handleChange}/>
    </Stack>
      </PaginationButton>
    </PaginationContainer>
  );
}
