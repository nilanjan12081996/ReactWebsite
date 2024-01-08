import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { register } from "../Redux/authSlice"
import { useNavigate } from "react-router-dom"
import "./reg.css"
import { Paper } from "@mui/material"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify"
import Layout from "../Layout/Layout"


const Register=()=>{
    const{redirectToo}=useSelector((state)=>state?.auth)
    
    const[user,setUser]=useState({
        name:"",
        email:"",
        mobile:"",
        password:"",
        photo:""
    })
    const[img,setImg]=useState()
    let name,value
    const postUser=(e)=>{
        name=e.target.name
        value=e.target.value
        setUser({...user,[name]:value})
    }
    const dispatch=useDispatch()
    const nevigate=useNavigate()
    const submitInfo=(e)=>{
        e.preventDefault()
        let formData=new FormData()
        formData.append("name",user.name)
        formData.append("email",user.email)
        formData.append("mobile",user.mobile)
        formData.append("password",user.password)
        formData.append("photo",img)
        dispatch(register(formData))
    }
    const RedirectUser=()=>{
        const name=localStorage.getItem("name")
        const isIntoLoginPage=window.location.pathname.toLowerCase()==='/register'
        if(name!==null && name!==undefined && name!=="")
        isIntoLoginPage && nevigate("/login")
    }
    useEffect(()=>{
        RedirectUser()
    },[redirectToo])
    return(
        <>
          <Layout>
          <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                icon={true}
            />
          
         <center> 
           <Paper sx={{height:650,width:800, textAlign:'left',marginTop:2, paddingTop:3, boxShadow:'0px 0px 30px rgba(0,0,0,0.5)'}}>
      
            
    <div className="main">
    <div className="pic">
        <img src="https://s3.ap-south-1.amazonaws.com/content.imsindia.com/ims-india/wp-content/uploads/2023/09/IPMAT-Registration-.jpg" height={'400px'} width={'300px'}/>
    </div>
    <form onSubmit={submitInfo}>
    
  <div className="form-group">
    <label for="exampleInputEmail1">Name</label>
    <input type="text" className="form-control" id="exampleInputEmail1" 
    value={user.name}
    name="name"
    onChange={e => postUser(e)}
    placeholder="Enter Your Name"
    />
  </div>
  <div className="form-group">
    <label for="exampleInputEmail1">Email</label>
    <input type="email" className="form-control" id="exampleInputEmail1" 
    value={user.email}
    onChange={e => postUser(e)}
    name="email"
    placeholder="Enter Your Email"
    />
  </div>
  <div className="form-group">
    <label for="exampleInputEmail1">Password</label>
    <input type="password" className="form-control" id="exampleInputEmail1" 
   name="password"
   value={user.password}
    onChange={e => postUser(e)}
    placeholder="Enter Your Password"
    />
</div>
<div className="form-group">
    <label for="exampleInputEmail1">Mobile</label>
    <input type="text" className="form-control" id="exampleInputEmail1" 
    value={user.mobile}
    name="mobile"
    onChange={e => postUser(e)}
    placeholder="Enter Your Phone"
    />
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Upload Photo</label>
    <input type="file" class="form-control"
     name="img" value={user.class}
      onChange={(e) => setImg(e.target.files[0])}
      accept="image/*"/>
      {
        img!==""&&img!==undefined&&img!==null?(
          <img
          style={{ height: "100px" }}
          src={URL.createObjectURL(img)}
          alt=""
          className="upload-img"
      />
        ):(
          <>
          {img === "" && <p>Drag or drop content here</p>}
          </>
        )
      }
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  


        </Paper>
        </center>
        </Layout>
        </>
    )
}
export default Register