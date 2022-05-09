import styled from "styled-components"

export const PaginationContainer = styled.div`
display: flex;
justify-content: flex-end;
margin-top: 1.25rem;
padding: 0 1rem 1rem 0;
`;
export const PaginationButton = styled.button`
border: none;
background: none;
display: flex;
/* border: 1px solid black; */
cursor: pointer;
align-items: center;
color: #718CFB;
&:last-child {
margin-right: 0;
}
&:disabled {
color: #A9AEBE;
}
`;