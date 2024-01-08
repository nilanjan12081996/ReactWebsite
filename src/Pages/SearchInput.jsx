import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Search as SearchIcon } from '@mui/icons-material';
import { Button, Input, InputAdornment } from '@mui/material'
import { fetch_search } from '../Redux/SearchSlice';


const SearchInput = () => {
    // const {search_data,status} =useSelector((state)=>state.search)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [searchQuery, setSearchQuery] = useState("");
    const handleSearch = () => {
        console.log("Search Query:", searchQuery);
        dispatch(fetch_search(searchQuery));
        navigate(`/search/${searchQuery}`)
    }
    useEffect(()=>{
      
    },[searchQuery])
  return (
    
    <>

<Input 
sx={{border:'1px solid black',borderRadius:'10px',padding:'5px',width:'100%'}}
        type="text"
        value={searchQuery}
        placeholder='Search here...'
        onChange={(e) => setSearchQuery(e.target.value)}
        endAdornment={
          <InputAdornment position="end">
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={handleSearch}
            >
              <SearchIcon />
            </Button>
          </InputAdornment>
        }
      />
    


    </>
  )
}

export default SearchInput