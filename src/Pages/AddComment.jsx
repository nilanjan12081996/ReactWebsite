import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
 // Import your comment slice action
import "./blog.css"
import { createComment, getComments } from '../Redux/singleBlogSlice';
import { reset_redirectTo } from '../Redux/authSlice';
// import { createComment } from '../Redux/commentSlice';
const AddComment = ({ blogId }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dispatch the createComment action with the necessary data
    dispatch(
      createComment({
        id: blogId,
        name,
        email,
        comment,
      })
    );

    // Clear input fields after submission (if needed)
    setName('');
    setEmail('');
    setComment('');
    getComments()
  };
  const{redirectTo}=useSelector((state)=>state?.auth)
  useEffect(() => {
    dispatch(reset_redirectTo(null))
  }, [redirectTo])
  return (
    <div class="comment-box">
    <h2>Leave a Comment</h2>
    <form onSubmit={handleSubmit} id="comment-form">
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
  </div>
  );
};

export default AddComment;
