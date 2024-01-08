import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, NavLink, useNavigate } from "react-router-dom"
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { AppBar, Avatar, IconButton, Menu, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { handleLoggedout } from "../Redux/authSlice";

const Navbar=()=>{
  const dispatch=useDispatch()
  const navigate=useNavigate()
    const Name = localStorage.getItem("name")
    const pic=localStorage.getItem("photo")
    const{isloggedIn,user}=useSelector((state)=>state?.auth)
    const [name, setName] = useState("")
    
    useEffect(() => {
      setName(Name);
    }, [Name]);
   
    const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState(null);
    const isMobileMenuOpen = Boolean(mobileMenuAnchorEl);
  
    const handleMobileMenuOpen = (event) => {
      setMobileMenuAnchorEl(event.currentTarget);
    };
  
    const handleMobileMenuClose = () => {
      setMobileMenuAnchorEl(null);
    };
  
    const logout = () => {
      dispatch(handleLoggedout())
      navigate("/login");
    };
    return(
        <>
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
   <AutoStoriesIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1,color:'green' }} />
  {/* <Typography 
  variant="h5"
  sx={{
    fontFamily: 'monospace',
       fontWeight: 700,
  }}
  ></Typography>  */}<NavLink style={{color:'green',fontFamily: 'monospace',fontWeight: 700,}} className="navbar-brand" to="#">PATHSHALA</NavLink>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">

    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <NavLink className="nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
      </li>
      <li className="nav-item active">
        <NavLink className="nav-link" to="/about">About <span className="sr-only">(current)</span></NavLink>
      </li>
      {
        isloggedIn!==true&&!Name ?(
            <>
      <li className="nav-item">
          <NavLink className="nav-link" to="/login">Login</NavLink>
        </li>
       <li className="nav-item active">
        <NavLink className="nav-link" to="/course">Course <span className="sr-only"></span></NavLink>
      </li> 
      <li className="nav-item active">
        <NavLink className="nav-link" to="/blog">Blog <span className="sr-only"></span></NavLink>
      </li>
            </>
        ):(
                <>
                  <li className="nav-item active">
        <NavLink className="nav-link" to="/course">Course <span className="sr-only"></span></NavLink>
      </li>
      <li className="nav-item active">
        <NavLink className="nav-link" to="/blog">Blog <span className="sr-only"></span></NavLink>
      </li>
      <li className="nav-item active">
        <NavLink className="nav-link" to="/contact">Contact <span className="sr-only"></span></NavLink>
      </li>
      <li className="nav-item">
              <NavLink onClick={logout} className="nav-link" to="/login">logout</NavLink>
            </li>
                 <li className="nav-item">
                 
                 <IconButton  sx={{ p: 0, marginLeft:3, }}>
                 
                <Avatar  sx={{
                 
                }} src={pic} alt={name}/>
              </IconButton>
            
            
            </li>
           
                </>
        )
      }
    </ul>
   
 
  </div>
</nav>  




        </>
    )
}
export default Navbar