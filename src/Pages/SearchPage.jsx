import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Grid,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import MessageIcon from "@mui/icons-material/Message";

import { useDispatch, useSelector } from "react-redux";

const SearchPage = () => {
  const { search_data, status } = useSelector((state) => state.searchPage);
  const dispatch = useDispatch();

  function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }

  console.log("search", search_data);
  return (
    <>
      
        <Box
          role="presentation"
          onClick={handleClick}
          color={"white"}
          sx={{
            height: "30px",
            backgroundColor: "#607b8a",
            padding: "20px",
            maxWidth: "100%",
          }}
        >
          <Breadcrumbs aria-label="breadcrumb" sx={{ color: "white" }}>
            <Link
              underline="hover"
              color="inherit"
              to="/"
              style={{ color: "white", textDecoration: "none" }}
            >
              Home
            </Link>

            <Link
              underline="hover"
              color="inherit"
              to=""
              style={{ color: "white", textDecoration: "none" }}
            >
              Search Results - {search_data?.length} results found
              {/* {search_data?.charAt(0).toUpperCase() +
                search_data?.substring(1)} */}
            </Link>
          </Breadcrumbs>
        </Box>

        <Grid
          container
          spacing={1}
          sx={{
            padding: "20px",
            margin: " auto",
            borderRadius: "30px",
            justifyContent: "center",
          }}
        >
          <Grid item xs={12} sm={12} md={12} >
            {status === "loading" ? (
              <Paper
                elevation={10}
                sx={{
                  padding: "20px",
                  margin: "10px auto",
                  borderRadius: "30px",
                  backgroundColor: "#dfedf5",
                  width:'80%'
                }}
              >
                <Skeleton
                  width={"100%"}
                  height={"300px"}
                  variant="rectangular"
                  style={{ borderRadius: "30px" }}
                  alt=""
                />
                <Box>
                  <Typography
                    variant="h5"
                    sx={{ padding: "5px", fontWeight: "bold" }}
                  >
                    <Skeleton variant="wave" />
                  </Typography>
                  <Grid container spacing={1} justifyContent={"center"}>
                    <Grid item xs={12} sm={6} md={4} justifyContent={"center"}>
                      <Typography
                        sx={{
                          display: "flex",
                          fontSize: "12px",
                          padding: "5px",
                        }}
                      >
                        <PersonIcon fontSize="10px" sx={{ padding: "2px" }} />{" "}
                        <Skeleton variant="wave" />
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} justifyContent={"center"}>
                      <Typography
                        sx={{
                          display: "flex",
                          fontSize: "12px",
                          padding: "5px",
                        }}
                      >
                        <AccessAlarmIcon
                          fontSize="5px"
                          sx={{ padding: "2px" }}
                        />{" "}
                        <Skeleton variant="wave" />
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <Typography
                        sx={{
                          display: "flex",
                          fontSize: "12px",
                          padding: "5px",
                        }}
                      >
                        <MessageIcon fontSize="5px" sx={{ padding: "2px" }} />
                        <Skeleton variant="wave" />
                      </Typography>
                    </Grid>
                  </Grid>

                  <Skeleton variant="wave" />
                  <Box sx={{ display: "flex", justifyContent: "end" }}>
                    <Skeleton variant="wave" />
                  </Box>
                </Box>
              </Paper>
            ) : search_data?.length > 0 ? (
              search_data &&
              search_data?.map((items, index) => {
                return (
                  <>
                    <Paper
                      key={index}                  
                      elevation={10}
                      sx={{
                        padding: "20px",
                        margin: "10px auto",
                        borderRadius: "30px",
                        backgroundColor: "#dfedf5",
                        width:'80%'
                        
                      }}
                    >
                      <img
                        src={`https://restapinodejs.onrender.com/api/blog/image/${items._id}`}
                        width={"100%"}
                        style={{ borderRadius: "30px" }}
                        alt=""
                      />
                      <Box>
                        <Typography
                          variant="h5"
                          sx={{ padding: "5px", fontWeight: "bold" }}
                        >
                          {items.title}{" "}
                        </Typography>
                        <Grid container spacing={1} justifyContent={"center"}>
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            justifyContent={"center"}
                          >
                            <Typography
                              sx={{
                                display: "flex",
                                fontSize: "12px",
                                padding: "5px",
                              }}
                            >
                              <PersonIcon
                                fontSize="10px"
                                sx={{ padding: "2px" }}
                              />{" "}
                              John Doe{" "}
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            justifyContent={"center"}
                          >
                            <Typography
                              sx={{
                                display: "flex",
                                fontSize: "12px",
                                padding: "5px",
                              }}
                            >
                              <AccessAlarmIcon
                                fontSize="5px"
                                sx={{ padding: "2px" }}
                              />{" "}
                              <time dateTime="">
                                {new Date(items.createdAt).toLocaleDateString()}
                              </time>
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={12} md={4}>
                            <Typography
                              sx={{
                                display: "flex",
                                fontSize: "12px",
                                padding: "5px",
                              }}
                            >
                              <MessageIcon
                                fontSize="5px"
                                sx={{ padding: "2px" }}
                              />
                              {items.comments.length} comments
                            </Typography>
                          </Grid>
                        </Grid>

                        <Typography
                          variant="body1"
                          dangerouslySetInnerHTML={{
                            __html: items.postText.slice(0, 350),
                          }}
                        />
                        <Box sx={{ display: "flex", justifyContent: "end" }}>
                        <NavLink to={`/blog/${items._id}`}> <button type="button" class="btn btn-primary"> Read More</button></NavLink>
                        </Box>
                      </Box>
                    </Paper>
                  </>
                );
              })
            ) : (
              <>
                <Box
                  sx={{ height: "80vh", margin: "50px", fontSize: "40px",display:'flex',justifyContent:'center' }}
                >
                  {" "}
                  "No Results Found"
                </Box>
              </>
            )}

          
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            
          </Grid>
        </Grid>
     
    </>
  );
};

export default SearchPage;
