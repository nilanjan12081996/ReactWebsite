
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


import Blogs from './Pages/Blogs';
import Navbar from './Header/Navbar';
import Course from './Pages/Course';
import Home from './Pages/Home';
import Category from './Pages/Category';
import SingleBlog from './Pages/SingleBlog';
import Login from './Pages/Login';
import About from './Pages/About';
import ApplyCourse from './Pages/ApplyCourse';
import Contact from './Pages/Contact';
import { useDispatch } from 'react-redux';
import Register from './Pages/Register';
import { useEffect } from 'react';
import { check_token } from './Redux/authSlice';
import sweetAlertService from './Pages/sweetAlertService';
import SearchInput from './Pages/SearchInput';
import SearchPage from './Pages/SearchPage';
import Footer from './Footer/Footer';


function App() {
  const dispatch = useDispatch()
  function PrivateRoute({ children }) {
   
    const token = localStorage.getItem("token") || sessionStorage.getItem("token")
    return token !== null && token !== undefined ? (
      children
    ) : (
      <>
        <Navigate to="/" />
        {alert("Please go for login either you can't access blogs")}

      
      </>
    )
  }
  const PublicRouteNames = [
    {
      path: '/',
      componant: <Home />
    },
    {
      path: '/login',
      componant: <Login />
    },
    {
      path: '/register',
      componant: <Register />
    }
  ]

  const ProtectedRouteNames = [
    {
      path: '/blog',
      component: <Blogs />

    },
    {
      path:'/search/:searchQuery',
      component:<SearchPage/>
    },
    {

      path: '/blog/:_id',
      component: <SingleBlog />
    },
    {
      path: '/category/:_id',
      component: <Category />
    },
    {
      path: '/about',
      component: <About />
    },
    {
      path: '/course',
      component: <Course />
    },
    {
      path: '/courseapply/:course/:_id',
      component: <ApplyCourse />
    },
    {
      path: '/contact',
      component: <Contact />
    }

  ]
  useEffect(() => {
    dispatch(check_token())
  }, [])
  return (

    <>
      {/* <Router>
      <Navbar/>
      <Routes>
          <Route path='/blog' element={<Blogs/>}/>
        <Route path='/course' element={<Course/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/category/:_id' element={<Category/>}/>
        <Route path='/blog/:_id' element={<SingleBlog/>}/>  
          <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
         <Route path='/' element={<Home/>}/> 
         <Route path='/about' element={<About/>}/>
         <Route path='/course/apply/:_id' element={<ApplyCourse/>}/>
         <Route path="/contact" element={<Contact/>}/>
       
      </Routes>
     
    </Router> */}

      <Router>
        {/* <Navbar /> */}
        <Routes>
          {PublicRouteNames?.map((route, index) => {
            return (
              <Route
                // key={index + 1}
                exact
                path={route.path}
                element={route.componant}
              />
            );
          })}

          {/**************  protected routes *********************/}

          {ProtectedRouteNames?.map((route, index) => {
            return (
              <Route
                // key={index + 2}
                path={route.path}
                element={<PrivateRoute>{route.component}</PrivateRoute>}
              />
            );
          })}
        </Routes>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
