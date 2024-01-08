import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createComment, getComments, getSingleBlog, likeBlog, unlikeBlog } from "../Redux/singleBlogSlice"
import { useParams } from "react-router-dom"
import { Button, Paper, Skeleton, Typography } from "@mui/material"
import "./blog.css"
import AddComment from "./AddComment"
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { toast } from "react-toastify"
import Layout from "../Layout/Layout"

const SingleBlog=()=>{
    const{_id}=useParams()
    const{loading,singleBlog,error,comments,like,unlike}=useSelector((state)=>
       state.singleblogs
        )
    //  const [localLikes, setLocalLikes] = useState(singleBlog?.data?.likes);
    //  const [localUnlikes, setLocalUnlikes] = useState(singleBlog?.data?.unlikes)
  
    //  console.log("Like: ",singleBlog?.data?.likes);
    //  console.log("Unlike: ",singleBlog?.data?.unlikes);
    const dispatch=useDispatch()
   
    useEffect(()=>{
        dispatch(getSingleBlog(_id))
        dispatch(getComments(_id))
       
    },[dispatch,_id])
  
    // const [localLikes, setLocalLikes] = useState(singleBlog?.data?.likes);
    // const [localUnlikes, setLocalUnlikes] = useState(singleBlog?.data?.unlikes)
       const [localLikes, setLocalLikes] = useState(0);
     const [localUnlikes, setLocalUnlikes] = useState(0)
    const [islikeClicked, setIsLikeClicked] = useState(localStorage.getItem(`liked_${_id}`) === 'true');
    const [isUnlikeClicked, setIsUnlikeClicked] = useState(localStorage.getItem(`unliked_${_id}`) === 'true')
    useEffect(() => {
      if (singleBlog?.data?.likes !== undefined) {
        setLocalLikes(singleBlog.data.likes);
      }
      if (singleBlog?.data?.unlikes !== undefined) {
        setLocalUnlikes(singleBlog.data.unlikes);
      }
    }, [singleBlog]);
   
    console.log("Like: ",localLikes);
    console.log("Unlike: ",localUnlikes);
       
   
    const handleLike = () => {
      if(!islikeClicked){
        
       
        setIsLikeClicked(true)
        setLocalLikes(localLikes + 1);
        localStorage.setItem(`liked_${_id}`, 'true');
        dispatch(likeBlog(_id));
        // dispatch(getSingleBlog(_id))
      }
      else {
        toast.warn("Already Liked")
      }
       // Pass the blog id if needed
    };
    const handleUnlike = () => {
      if(!isUnlikeClicked){
        
        setIsUnlikeClicked(true)
        setLocalUnlikes(localUnlikes + 1);
        localStorage.setItem(`unliked_${_id}`, 'true');
        dispatch(unlikeBlog(_id));
        // dispatch(getSingleBlog(_id))
      }
      else {
        toast.warn("Already UnLiked")
      }
       
    };
    const load = 3
    const [loadMore, setLoadMore] = useState(load)
    const handleLoadMore = () => {
      setLoadMore(loadMore + load)
    }
    return(
        <>
        <Layout>
         {
          loading ? (
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
          ) : (
            
              <Paper
                sx={{
                  gap: 1,
                  p: 2,
                  borderRadius: 2,
                  display: 'grid',
                  marginTop:3,
                  marginBottom:3,
                  boxShadow:'0px 0px 30px rgba(0,0,0,0.5)'

                }} elevation={10}>
                <Typography variant="h6">
                  <b>{singleBlog?.data?.title}</b>
                </Typography>
                <Paper sx={{width:550,boxShadow:'0px 0px 30px rgba(0,0,0,0.8)'}}>
                  <img src={`https://restapinodejs.onrender.com/api/blog/image/${_id}`} alt="pic" height={"380px"} width={"550px"}  />
                </Paper>
                <Typography>
                <div dangerouslySetInnerHTML={{ __html: singleBlog?.data?.postText }} />
                </Typography>
                <p>
                <span>
              {
                <Button onClick={() => handleLike()}
                disabled={islikeClicked}
                ><ThumbUpIcon /></Button>
              }
             
              {localLikes} 
              </span>
              <span>
                {
                  <Button onClick={() => handleUnlike()}
                  disabled={isUnlikeClicked}
                  ><ThumbDownIcon /></Button>
                }
                 
                {localUnlikes}
              </span>
                <span><CommentIcon sx={{ color: '#0565ad', marginLeft:2}} />{comments?.length}</span>
                </p>
                
              </Paper>
            
          )
        }
         <Paper
        sx={{
          gap: 1,
          p: 2,
          borderRadius: 2,
          display: 'grid',
          marginTop:6,
          marginBottom:3,
          boxShadow:'0px 0px 30px rgba(0,0,0,0.6)'

        }} elevation={10}
        >
                    <div class="card-body">
            <h1>Comments({comments?.length})</h1>
            {
              comments?.slice(0, loadMore)?.map((comm) => {
                return (
                  <>
                    <h3>{comm.name}</h3>
                    <p>{comm.comment}</p>
                    <p>{comm.updatedAt}<br />{comm.email}</p>

                  </>
                )
              })

            }
            {
              loadMore < comments.length && (
                <Button variant="contained"
                  className='mt-4 loadMore_btn'
                  onClick={handleLoadMore}>
                  Load more
                </Button>
              )
            }

          </div>
          {/* <div class="comment-box">
            <h2>Leave a Comment</h2>
            <form onSubmit={HandleComment} id="comment-form">
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
              <textarea id="comment" placeholder="Type your comment here" rows="4" cols="50"
                value={comment}
                onChange={(e) => { setComment(e.target.value) }}
              ></textarea>
              <button type="submit">Add Comment</button>
            </form>
          </div> */}
        <AddComment blogId={_id} />
          </Paper>
          </Layout>
        </>
    )
}
export default SingleBlog