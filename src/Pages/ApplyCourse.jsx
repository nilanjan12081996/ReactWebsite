import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { applyCourse } from "../Redux/courseSlice"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { reset_redirectTo } from "../Redux/authSlice"
import Layout from "../Layout/Layout"

const ApplyCourse = () => {
    const { course,_id } = useParams()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [city, setCity] = useState("")
    const [address, setAddress] = useState("")
    const [qualification, setQualification] = useState("")
    const [programing_knowledge, setPrograming_knowledge] = useState("")
    const [experiance, setExperiance] = useState("")
    const nevigate = useNavigate()
    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(applyCourse(
            {
                _id,
                name,
                email,
                phone,
                city,
                address,
                qualification,
                programing_knowledge,
                experiance
            }))
            nevigate("/course")
    }
    const{redirectTo}=useSelector((state)=>state?.auth)
    useEffect(() => {
        dispatch(reset_redirectTo(null))
      }, [redirectTo])
    return (
        <>
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
                <Layout>

               
                 <div className="main">
                    <form onSubmit={handleSubmit}>
                        <h1 style={{color:'#098503'}}>Apply For: {course}</h1>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Name</label>
                            <input type="text" className="form-control" id="exampleInputEmail1"
                                value={name}
                                onChange={(e) => { setName(e.target.value) }}
                                placeholder="Enter Your Name"
                            />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Email</label>
                            <input type="email" className="form-control" id="exampleInputEmail1"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                                placeholder="Enter Your Email"
                            />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Phone</label>
                            <input type="text" className="form-control" id="exampleInputEmail1"
                                value={phone}
                                onChange={(e) => { setPhone(e.target.value) }}
                                placeholder="Enter Your Phone"
                            />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputEmail1">City</label>
                            <input type="text" className="form-control" id="exampleInputEmail1"
                                value={city}
                                onChange={(e) => { setCity(e.target.value) }}
                                placeholder="Enter Your City"
                            />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Address</label>
                            <input type="text" className="form-control" id="exampleInputEmail1"
                                value={address}
                                onChange={(e) => { setAddress(e.target.value) }}
                                placeholder="Enter Your Address"
                            />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Qualification</label>
                            <input type="text" className="form-control" id="exampleInputEmail1"
                                value={qualification}
                                onChange={(e) => { setQualification(e.target.value) }}
                                placeholder="Enter Your Qualification"
                            />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Programming Knowledge</label>
                            <input type="text" className="form-control" id="exampleInputEmail1"
                                value={programing_knowledge}
                                onChange={(e) => { setPrograming_knowledge(e.target.value) }}
                                placeholder="Enter Your Programming Knowledge"
                            />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Experience</label>
                            <input type="text" className="form-control" id="exampleInputEmail1"
                                value={experiance}
                                onChange={(e) => { setExperiance(e.target.value) }}
                                placeholder="Enter Your Experience"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Apply</button>
                    </form>
                </div>
                </Layout>
        </>
    )
}
export default ApplyCourse