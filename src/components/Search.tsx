import React, { ChangeEvent, useState } from 'react'
import { TextField, InputAdornment } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'

interface SearchProps {
  searchLabel?: string
  placeholder?: string
  searchInput: string
  setSearchInput: (search: string) => void
  triggerSearch: () => void
}

function Search({
  setSearchInput,
  searchLabel = 'search',
  placeholder = 'Type a text and hit Enter',
  searchInput,
  triggerSearch,
}: SearchProps) {
  const [showClearIcon, setShowClearIcon] = useState<string>('none')

  const handleSearchChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setShowClearIcon(e.target.value === '' ? 'none' : 'flex')
    setSearchInput(e.target.value)
  }

  const handleClick = (): void => {
    setSearchInput('')
    setShowClearIcon('none')
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      triggerSearch()
    }
  }

  return (
    <TextField
      value={searchInput}
      fullWidth
      onChange={handleSearchChange}
      onKeyPress={handleKeyPress}
      size="small"
      label={searchLabel}
      margin="normal"
      variant="outlined"
      placeholder={placeholder}
      InputProps={{
        startAdornment: (
          <InputAdornment
            position="start"
            style={{ display: showClearIcon }}
            onClick={handleClick}
            sx={{ cursor: 'pointer' }}
          >
            <ClearIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment
            position="end"
            onClick={triggerSearch}
            sx={{ cursor: 'pointer' }}
          >
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  )
}

export default Search
