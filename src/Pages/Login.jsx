import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { handleRegister, login, reset_redirectToo } from "../Redux/authSlice"
import { ToastContainer } from "react-toastify"
import "./login.css"
import { Paper } from "@mui/material"
import 'react-toastify/dist/ReactToastify.css';
import Layout from "../Layout/Layout"


const Login=()=>{
    const dispatch=useDispatch()
    const{redirectTo,redirectToo}=useSelector((state)=>state?.auth)
    const navigate=useNavigate()
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
     
      const RedirectUser=()=>{
        const token=localStorage.getItem("token")
        const isIntoLoginPage=window.location.pathname.toLowerCase()==='/login'
        if(token!==null&&token!==undefined&&token!=="")
        isIntoLoginPage && navigate('/')
      }
      useEffect(()=>{
        RedirectUser()
      },[redirectTo])
      useEffect(()=>{
        dispatch(reset_redirectToo(null))
    },[redirectToo])
  
    const submitInfo=(e)=>{
      e.preventDefault()
    dispatch(login({email,password}));
      }
      
  const reg = () => {
    dispatch(handleRegister());
   
  };
    return(
        <>
        
            <Layout>
         <center>  
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
          <Paper sx={{height:340,width:800, textAlign:'left',marginTop:7, paddingTop:3, boxShadow:'0px 0px 30px rgba(0,0,0,0.8)'}}>
    
    <div className="main">
    <div className="pic">
        <img src="https://sales.webtel.in/images/Login-page-character1.png" height={'300px'} width={'350px'}/>
    </div>
    <form onSubmit={submitInfo}>
   
  <div class="form-group">
    <label for="exampleInputEmail1">Email </label>
    <input type="email" class="form-control" id="exampleInputEmail1" 
    aria-describedby="emailHelp"
    value={email}
    onChange={(e)=>{setEmail(e.target.value)}}
    placeholder="Enter Your Email"
    />
     </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1"
    value={password}
    onChange={(e)=>setPassword(e.target.value)}
    placeholder="Enter Your Password"
    
    />
  </div>
  <button type="submit" class="btn btn-primary">Login</button>
  <Link onClick={reg} to='/registration'>Don't Have Account?Register Here</Link>
</form>
    </div>
    </Paper>
    </center>
    </Layout>
        </>
    )
}
export default Login
