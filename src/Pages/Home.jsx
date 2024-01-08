import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getBanner, getService, getTesti } from "../Redux/homeSlice"

import "react-responsive-carousel/lib/styles/carousel.min.css";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './home.css'
import { Alert, Card, CardContent, Paper, Typography } from "@mui/material";
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import { Carousel } from "react-responsive-carousel";
import { reset_redirectTo, reset_redirectToo } from "../Redux/authSlice";
import Layout from "../Layout/Layout";

const Home=()=>{
    const{banner,service,testi,loading,error}=useSelector((state)=>state.homepage)
    const{redirectTo}=useSelector((state)=>state?.auth)
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(reset_redirectTo(null));
    },[redirectTo])
    useEffect(()=>{
        dispatch(getBanner())
    },[dispatch])
    useEffect(()=>{
        dispatch(getService())
    },[dispatch])
    useEffect(()=>{
        dispatch(getTesti())
    },[dispatch])
    
   
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
       
                {
                        loading===true?(

                                <Skeleton animation="wave" variant="rect" height={500} width={'100%'} />
                                    
                        ):(   
                            <Carousel>

                            {
                                banner?.map((ban) => {
                                    return (
                                        <>
                                            <div>
                                                <img src={`https://restapinodejs.onrender.com/api/banner/photo/${ban._id}`} height={'700px'} width={'100%'} alt="pic" />
        
                                                <p className="legend">
                                                    <h1>{ban?.title}</h1>
                                                    <p>{ban?.description}</p>
                                                </p>
        
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </Carousel>)
                }
             



                {/* Service */}
                {
                    loading === true ? (    
                         <>
                     <div class="container">
                                <div class="row">
                        {[1, 2, 3,4,5,6].map((item) => (
                          <div key={item} 
                          className="col-sm">
                            
                              <Skeleton animation="wave" variant="rect" height={400} width={400} />
                                                          
                          </div>
                          
                          
                        ))}
                        </div>
                          </div>
                     </>) : (
                        <div className="Service">

                            <div class="container">
                                <div class="row">
                                    {
                                        service?.map((items) => {
                                            return (
                                                <>
                                                    <div class="col-sm">
                                                        <Card sx={{ minWidth: 275, margin: '0 0 16px 0', height: '500', p: 2,boxShadow: '0px 0px 30px rgba(0,0,0,0.4)' }}>
                                                            <CardContent
                                                                sx={{
                                                                    margin: '0 0 16px 0',
                                                                    p: 2,
                                                                    display: 'flex',
                                                                    flexDirection: 'column',
                                                                    justifyContent: 'center', 
                                                                    alignItems: 'center',

                                                                }}>
                                                                <Typography sx={{ mb: 4.1, color: 'blue' }}>
                                                                    <LanguageOutlinedIcon />
                                                                </Typography>
                                                                <Typography sx={{ mb: 2.5 }} variant="h5" component="div">
                                                                    {items?.name}
                                                                </Typography>
                                                                <Typography sx={{ fontSize: 14, mb: 1.5, display: 'flex',textAlign:'center'
                                                                   }} color="text.secondary" gutterBottom>
                                                                    {items?.details?.slice(0, 50)}
                                                                </Typography>


                                                            </CardContent>

                                                        </Card>
                                                    </div>
                                                </>
                                            )
                                        })
                                    }

                                </div>
                            </div>
                        </div>

                    )
                }


                {/* Testimonial */}

                <div className="testimonial">

                    <center>
                        <h1 style={{color:'#098503'}}>TESTIMONIAL</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi</p>
                        <div class="container">
                            <div class="row">

                                {
                                    testi.map((items) => {
                                        return (
                                            <>
                                                <div class="col-sm-6">
                                                    
                                                    <Paper  sx={{
                                gap:1,
                                p:2,
                                borderRadius: 2,
                                display: 'flex',
                                flexDirection:'Row',
                                margin: '0 0 16px 0',
                                height:290
                                
                              }} elevation={10}>
                                                        <Typography>
                                                        <img src={`https://restapinodejs.onrender.com/api/testimonials/photo/${items._id}`} alt="" height={'70px'} width={'70px'} />
                                                        </Typography>
                                                        <Typography sx={{
                                                            gap:3,
                                                            margin:'0  16px 0',
                                                            textAlign:'left',
                                                            mb:2.5
                                                        }} variant="h5">
                                                        {items.name}<br/>
                                                        <Typography color="text.secondary">
                                                        {items.position}
                                                        </Typography>
                                                        <Typography color="text.secondary">
                                                        {items.talk}
                                                        </Typography>
                                                        </Typography>
                                                        
                                                    </Paper>
                                                    
                                                </div>

                                            </>
                                        )
                                    })
                                }

                            </div>
                        </div>
                    </center>


                </div>
                </Layout>
        </>
    )
}
export default Home