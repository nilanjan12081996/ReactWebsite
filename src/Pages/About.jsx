import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getteam } from "../Redux/aboutSlice"
import { Card, CardContent, Typography } from "@mui/material"
import './about.css'
import { reset_redirectTo } from "../Redux/authSlice"
import Layout from "../Layout/Layout"

const About=()=>{
    const dispatch=useDispatch()
    const{loading,team}=useSelector((state)=>state.aboutPage)
    useEffect(()=>{
        dispatch(getteam())
    },[dispatch])
    const{redirectTo}=useSelector((state)=>state?.auth)
    useEffect(() => {
        dispatch(reset_redirectTo(null))
      }, [redirectTo])
    return(
        <>
        <Layout>
         <div class="container top">
                    <div class="row">
                        <div class="col-sm">
                            <h1 className="hd" style={{color:'#098503'}}>ACHIVER:ELEVATING <br />THROUGH EDUCATION</h1>
                            <h4 className="hd1" style={{color:'#098503'}}>Nuturing Exellence and Empowring Minds <br />Through Education Growth</h4>
                        </div>
                        <div class="col-sm">
                            discover the essence of achiver- a place where aspirations are nurturedbr
                            Skills are honed,and dreams finds their path and reality.discover the <br />essence of achiver- a place where aspirations are nurturedbr
                            Skills are honed,and dreams finds their path and reality.
                        </div>

                    </div>
                </div>
                <div className="team">
                    <h1 style={{color:'#098503'}}>OUR TEAM</h1>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni qui tenetur iure debitis enim quidem, voluptatem nam quaerat quae, facere <br />temporibus eveniet velit libero dicta numquam dolorem praesentium nesciunt repudiandae.</p>
                    <div class="container">
                        <div class="row">
                            {
                                team.map((teams) => {
                                    return (
                                        <>
                                            <div class="col-sm-4">
                                               
                                                <Card sx={{ minWidth: 275, margin: '0 0 16px 0', height: '500', p: 2,boxShadow:'0px 0px 30px rgba(0,0,0,0.5)' }}>
                                                            <CardContent
                                                                sx={{
                                                                    margin: '0 0 16px 0',
                                                                    p: 2,
                                                                    display: 'flex',
                                                                    flexDirection: 'column',
                                                                    justifyContent: 'center', 
                                                                    alignItems: 'center',
                                                                    height:400

                                                                }}>
                                                                <Typography>
                                                                <img src={`https://restapinodejs.onrender.com/api/team/photo/${teams._id}`} class="card-img-top" alt="..." height={300} width={100}/>
                                                                </Typography>
                                                                <Typography sx={{ mb: 2.5 }} variant="h5" component="div">
                                                                    {teams?.name}
                                                                </Typography>
                                                                <Typography sx={{ fontSize: 14, mb: 1.5, display: 'flex',textAlign:'center'
                                                                   }} color="text.secondary" gutterBottom>
                                                                    {teams.possession}
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
                </Layout>
        </>
    )
}
export default About