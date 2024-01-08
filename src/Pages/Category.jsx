
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSingleCategory } from "../Redux/categorySlice"
import { useParams } from "react-router-dom"
import Skeleton from "react-loading-skeleton"
import { Paper } from "@mui/material"
import { reset_redirectTo } from "../Redux/authSlice"
import Layout from "../Layout/Layout"

const Category=()=>{
    const{category,loading,error}=useSelector((state)=>state.categoryPage)
    const{_id}=useParams()
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(getSingleCategory(_id))
    },[dispatch])
    const{redirectTo}=useSelector((state)=>state?.auth)
    useEffect(() => {
      dispatch(reset_redirectTo(null))
    }, [redirectTo])
    return(
        <>
       
        {
          loading?(
            <>
            {[1].map((item) => (
            
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
                     <div class="card">
  
  <div class="card-body">
    {
      category.map((cat)=>{
        return(
          <>
          <img src={`https://restapinodejs.onrender.com/api/blog/image/${cat._id}`} alt="pic" height={"200px"} width={"350px"} />
    <h5 class="card-title">{cat?.title}</h5>
    <p class="card-text"><div dangerouslySetInnerHTML={{__html:cat?.postText}}></div></p>
          </>
        )
      })
    }
  
  </div>
</div>
            </>
          )
        }
        
        </>
    )
}
export default Category