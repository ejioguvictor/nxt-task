import React, { useState } from 'react'
import { useAsyncDebounce } from 'react-table'
import { SearchBar } from './styles'


export const GlobalFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter)

  const onChange = useAsyncDebounce(value => {
    setFilter(value || undefined)
  }, 1000)
  
  return (
    <span>
      <SearchBar>
      Search: {' '}
      <input
        className='search-input'
        value={value || ''}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder = 'Enter details'
      />
      </SearchBar>
    </span>
  )
}