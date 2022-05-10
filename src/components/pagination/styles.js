import styled from "styled-components"

export const PaginationContainer = styled.div`
display: flex;
justify-content: flex-end;
margin-top: 1.25rem;
padding: 0 1rem 1rem 0;
margin-right: 20px;
position: relative;
`;
export const PaginationButton = styled.div`
border: none;
background: none;
display: flex;
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