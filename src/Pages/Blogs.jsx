import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getBlogs, getCategory, getRPost } from "../Redux/blogSlice"
import { Alert, Box, Button, List, ListItem, ListItemText, Paper, Skeleton, Typography } from "@mui/material"
import { NavLink } from "react-router-dom"
import { reset_redirectTo } from "../Redux/authSlice"

import SearchInput from "./SearchInput"
import Layout from "../Layout/Layout"

const Blogs=()=>{
    const{blogs,category,posts,loading,error}=useSelector((state)=>state.blogsPage)
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(getBlogs())
    },[dispatch])
    useEffect(()=>{
        dispatch(getCategory())
    },[dispatch])
    useEffect(()=>{
        dispatch(getRPost())
    },[dispatch])
   
   
    
    const load=3
    const[loadmore,setloadMore]=useState(load)
    const handleLoadMore=()=>{
        setloadMore(loadmore+load)
    }
    const{redirectTo}=useSelector((state)=>state?.auth)
    useEffect(() => {
      dispatch(reset_redirectTo(null))
    }, [dispatch,redirectTo])
    return(
        <>
        <Layout>
        {
            error?(
                <Alert severity="error"><p>Something went Wrong</p></Alert>
            ):(
                <>
                
                </>
            )
        }
       <div class="container">
  <div class="row">
    <div class="col-sm-8">
      {
        loading?(
            <>
              {[1, 2, 3].map((item) => (
                      <div key={item} className="col-sm">
                        <Paper sx={{ gap: 1, p: 2, borderRadius: 2, display: 'grid', margin: '0 0 16px 0' }} elevation={10}>
                          <Skeleton animation="wave" variant="rect" height={200} width={350} />
                          <Skeleton animation="wave" variant="text" width={200} height={24} />
                          <Skeleton animation="wave" variant="text" width={100} height={16} />
                        </Paper>
                      </div>
                    ))}
            </>
        ):(
            <>
            {
                blogs?.slice(0,loadmore)?.map((items)=>{
                    return(
                        <>
                        <Paper sx={{
                        marginTop:4,
                        gap:1,
                        p:2,
                        borderRadius: 2,
                        display: 'grid',
                        boxShadow:'0px 0px 30px rgba(0,0,0,0.5)'
                        
                      }} elevation={10}
                        >
                             <Typography>
                                <img src={`https://restapinodejs.onrender.com/api/blog/image/${items._id}`} alt="pic" height={"200px"} width={"350px"} />
                                </Typography>
                                <Typography variant="h6">
                               <b>{items.title}</b> 
                                </Typography>
                                <div dangerouslySetInnerHTML={{ __html: items.postText.slice(0, 300) }} />
                                  <NavLink to={`/blog/${items._id}`}> <button type="button" class="btn btn-primary"> Read More</button></NavLink>

                        </Paper>

                        </>
                    )
                })
            }
            </>
        )
      }
       {
                        loadmore < blogs.length && (
                            <Button sx={{
                                marginTop:'20px',
                                marginBottom:'20px'
                            }} variant="contained" onClick={handleLoadMore}>  Load more</Button>
                        
                        )
                      }
    </div>
    <div class="col-sm">
   
    <Box sx={{marginTop:'30px',boxShadow:'0px 0px 30px rgba(0,0,0,0.8)'}}>
    <SearchInput/>
              {
                loading?(category.map((items, keys) => (
                  <div key={keys}>
                    <Skeleton animation="wave" width={150} height={24} />
                  </div>
                ))
                ):
                (category?.map((items, keys) => {

                  return (
                    <>
                   
                      <List sx={{width: '100%', maxWidth: 200, bgcolor: '',borderRadius:2,display:'grid',textAlign:'center'}}>
                        <ListItem>
                          <ListItemText sx={{textAlign:'left'}} primary={<NavLink to={`/category/${items?._id}`}>{items.category}</NavLink>}/>
                        </ListItem>
                      </List>
                      
                    </>
                  )
                })
                )
              }
              </Box>

              <Box sx={{ marginTop:5,boxShadow:'0px 0px 30px rgba(0,0,0,0.8)'}}>

<center><h1 style={{color:'#098503'}}>Recent Post</h1></center>  
  {
    posts?.map((items) => {
      return (
        <>
           <List sx={{width: '100%', maxWidth: 360, bgcolor: '',borderRadius:2,display:'grid'}}>
            <ListItem>
              <ListItemText primary={<NavLink to={`/blog/${items._id}`}  > <span><img src={`https://restapinodejs.onrender.com/api/blog/image/${items._id}`} alt="pic" height={'30px'} width={'50px'} />
              {items.title}</span><br />{items.updatedAt}</NavLink>}/>
            </ListItem>
          </List>
        </>
      )
    })
    
  }
  </Box>
    </div>
   
  </div>
</div>
</Layout>
        </>
    )
}
export default Blogs