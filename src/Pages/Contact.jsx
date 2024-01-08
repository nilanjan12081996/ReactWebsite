import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { contact } from "../Redux/contactSlice"
import { ToastContainer } from "react-toastify"
import { Paper } from "@mui/material"
import { useNavigate } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import { reset_redirectTo } from "../Redux/authSlice"
import Layout from "../Layout/Layout"

const Contact=()=>{
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [message, setMessage] = useState("")
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const handleContact = async (e) => {
            dispatch(contact(
                {
                    name,
                    email,
                    phone,
                    message
                }
            ))
            setName("")
            setEmail("")
            setMessage("")
            setPhone("")
            console.log("Contact add Successfully");
            navigate("/blog")

    }
    const{redirectTo}=useSelector((state)=>state?.auth)
    useEffect(() => {
        dispatch(reset_redirectTo(null))
      }, [redirectTo])
    return(
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
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.985876015813!2d88.28442787443245!3d22.542201834085414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02799ff268be19%3A0x2901891abb4fb1f1!2sHarimohan%20Ghosh%20College!5e0!3m2!1sen!2sin!4v1698298795113!5m2!1sen!2sin" width={"100%"} height={"400"} style={{ border: '0' }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                <Paper elevation={10}sx={{width:1400,marginTop:3,marginBottom:3}}>
                <div class="comment-box">
                    <form onSubmit={handleContact} id="comment-form">
                        <label for="exampleInputEmail1">Name</label>
                        <input type="text" className="form-control" id="exampleInputEmail1"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                            placeholder="Enter Your Name"
                        />
                        <label for="exampleInputEmail1">Email</label>
                        <input type="text" className="form-control" id="exampleInputEmail1"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                            placeholder="Enter Your Email"
                        />
                        <label for="exampleInputEmail1">Phone</label>
                        <input type="text" className="form-control" id="exampleInputEmail1"
                            value={phone}
                            onChange={(e) => { setPhone(e.target.value) }}
                            placeholder="Enter Your Phone"
                        />
                        <textarea id="message" placeholder="Type your comment here" rows="4" cols="50"
                            value={message}
                            onChange={(e) => { setMessage(e.target.value) }}
                        ></textarea>
                        <button type="submit">Add Message</button>
                    </form>
                </div>
                </Paper>
                </Layout>
        </>
    )
}
export default Contact