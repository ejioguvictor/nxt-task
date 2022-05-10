import styled from "styled-components"

export const SearchBar = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 20%;
gap: 0.5rem;
height: 20px;
margin-left: 5rem;
outline: none;
padding: 5px;

.search-input{
    padding: 3px 5px;  
    width: 100%;
	font-family: Lato;   
	border: none;  
    outline: none;  
    border-radius: 3px;
    color: gray;
    box-shadow: 0 0 5px rgba(200, 200, 2000, 1);
}          
`;