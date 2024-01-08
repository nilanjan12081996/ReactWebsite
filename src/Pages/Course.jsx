import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCoure } from "../Redux/courseSlice"
import { Alert, Card, CardContent, Skeleton, Typography } from "@mui/material"
import { NavLink } from "react-router-dom"
import { reset_redirectTo } from "../Redux/authSlice"
import Layout from "../Layout/Layout"

const Course = () => {
    const { course, loading, error } = useSelector((state) => state.coursePage)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCoure())
    }, [dispatch])
    const{redirectTo}=useSelector((state)=>state?.auth)
    useEffect(() => {
        dispatch(reset_redirectTo(null))
      }, [redirectTo])
    return (
        <>
        <Layout>
            <center><h1 className="heads">Courses</h1></center>
            <div class="container">
                <div class="row">
                    {
                        error ? (
                            <Alert severity="error"><p>Something went Wrong</p></Alert>
                        ) : (
                            <>

                            </>
                        )
                    }
                    {
                        loading === true ? (
                            <>
                                <Card sx={{ minWidth: 275, marginTop: 3, height: '500', p: 2, boxShadow: '0px 0px 30px rgba(0,0,0,0.5)' }}>
                                    <CardContent
                                        sx={{
                                            margin: '0 0 16px 0',
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: 400

                                        }}>

                                        <div class="container">
                                            <div class="row">
                                                {
                                                    [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                                                        <div key={item}
                                                            className="col-sm">
                                                            <Skeleton animation="wave" variant="rect" height={200} width={350} /> <br />
                                                            <Skeleton animation="wave" variant="rect" height={24} width={200} /><br />
                                                            <Skeleton animation="wave" variant="rect" height={10} width={50} />
                                                        </div>
                                                    ))


                                                }
                                            </div>
                                        </div>



                                    </CardContent>
                                </Card>

                            </>

                        ) : (
                            course?.map((courses) => {
                                return (
                                    <>
                                        <div class="col-sm">
                                        <Typography sx={{backgroundColor:'#3ab004',width:'100%',textAlign:'center',height:'35px',fontWeight:'50px',color:'white' }} style={{borderTopLeftRadius:10,borderTopRightRadius:10}} variant="h5" component="div">
                                                      <b>  {courses?.name}</b>
                                                    </Typography>
                                            <Card sx={{ minWidth: 275, marginBottom:5, height: '500', p: 2, boxShadow: '0px 0px 30px rgba(0,0,0,0.4)' }}>
                                                <CardContent
                                                    sx={{
                                                        margin: '0 0 16px 0',
                                                        p: 2,
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        height: 400

                                                    }}>
                                                  
                                                    <Typography>
                                                        <img src={`https://restapinodejs.onrender.com/api/course/photo/${courses._id}`} class="card-img-top" alt="..." height={'200px'} width={'150px'} />
                                                    </Typography>
                                                    
                                                    <Typography sx={{
                                                        fontSize: 18, mb: 1.5, display: 'flex', textAlign: 'center',marginTop:3
                                                    }} color="text.secondary" gutterBottom>
                                                      <p><b>₹: *{courses?.fees}</b> </p>  
                                                    </Typography>
                                                    <Typography sx={{
                                                        fontSize: 18, mb: 1.5, display: 'flex', textAlign: 'center',
                                                    }} color="text.secondary" gutterBottom>
                                                        {courses?.requirement}
                                                    </Typography>

                                                    <NavLink to={`/courseapply/${courses?.name}/${courses?._id}`} className="btn btn-success">Apply Now</NavLink>
                                                </CardContent>

                                            </Card>
                                        </div>


                                    </>
                                )
                            })

                        )
                    }



                </div>
            </div>
            </Layout>
        </>
    )
}
export default Course