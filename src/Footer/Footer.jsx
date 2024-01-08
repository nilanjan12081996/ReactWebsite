import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import ButtonGroup from '@mui/material/ButtonGroup';
import { useSelector } from "react-redux";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';



const Footer = () => {
  const privatePage = ["Home", "About","Course","Blog","Contact"];
  const publicPage = ["Home", "Login"];
  const services = ["Traning","Specialized Training","Soft Skills Development","Placement Guarantee"]
  const{isloggedIn}=useSelector((state)=>state?.auth)
  const Name = localStorage.getItem("name")
  return (
    <>
      <Container
        maxWidth="xl"
        sx={{ backgroundColor: "#1E1E1E", height: "auto", mt: 2 }}
      >
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          direction={{ xs: "column", md: "row" }}
          justifyContent={{ xs: "center", md: "flex-end" }}
          
        >
          <Grid item xs={3} sx={{mt: 2}}>
          

            <Typography
              variant="h5"
              sx={{ color: "white", fontWeight: "bold", textAlign: "center",}}
            >
            <AutoStoriesIcon sx={{ mr: 1,color:'green',fontSize:40 }} />
              Pathshala
            </Typography>
           
            <Box width={"50%"} m={"auto"}>
            <Typography sx={{ color: "white", }}>
              N,92/B Paharpur Road Kolkata-24
            </Typography>
            </Box>
          </Grid>
          <Grid item xs={3} sx={{mt: 2}}>
            <Typography
              variant="h5"
              sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}
            >
              Useful Links
            </Typography>
            <List sx={{m: "auto"}}>
              {isloggedIn!==true&&!Name
                ? publicPage?.map((page) => {
                    return (
                      <>
                        <Box width={"50%"} m={"auto"}>
                        <ListItem sx={{}}>
                          <ListItemIcon>
                            <ArrowForwardIosIcon
                              sx={{ color: "green", textAlign: "center" }}
                            />
                          </ListItemIcon>
                          <Link style={{textDecoration: "none", }} to={page==="Home" ? ('/') : (`/${page}`)}>
                          <ListItemText
                            primary={page}
                            sx={{ color: "white" }}
                          />
                          </Link>
                        </ListItem>
                        </Box>
                      </>
                    );
                  })
                : privatePage?.map((page) => {
                    return (
                      <>
                      <Box width={"50%"} m={"auto"}>
                        <ListItem>
                          <ListItemIcon>
                            <ArrowForwardIosIcon
                              sx={{ color: "green", textAlign: "center" }}
                            />
                          </ListItemIcon>
                          <Link style={{textDecoration: "none", }} to={page==="Home" ? ('/') : (`/${page}`)}>
                          <ListItemText
                            primary={page}
                            sx={{ color: "white" }}
                          />
                          </Link>
                        </ListItem>
                        </Box>
                      </>
                    );
                  })}
            </List>
          </Grid>
          <Grid item xs={3} sx={{mt: 2}}>
            <Typography
              variant="h5"
              sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}
            >
              Our Services
            </Typography>
            <List sx={{m: "auto"}}>
              {
                services?.map((service)=>{
                  return (
                    <>
                    <Box width={"65%"} m={"auto"}>
                      <ListItem>
                          <ListItemIcon>
                            <ArrowForwardIosIcon
                              sx={{ color: "green", textAlign: "center" }}
                            />
                          </ListItemIcon>
                          <Link style={{textDecoration: "none", }} to="#">
                          <ListItemText
                            primary={service}
                            sx={{ color: "white" }}
                          />
                          </Link>
                        </ListItem>
                        </Box>
                    </>
                  )
                })
              }
            </List>
          </Grid>
          <Grid item xs={3} sx={{mt: 2}}>
            <Typography
              variant="h5"
              sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}
            >
              Join Our Newsletter
            </Typography>
            <Typography align={"center"} color={"white"} mt={2}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, doloremque?
            </Typography>
            <ButtonGroup sx={{ mt: 2, pl: 3, mb: 2, alignContent: "center"}} m={"auto"}>
            <TextField id="outlined-basic" variant="outlined" sx={{backgroundColor: "white", borderRadius: "10px 0px 0px 10px", width: "auto"}}/>
            <Button variant="contained" sx={{borderRadius: "0px 10px 10px 0px", pt: 2, pb: 2, backgroundColor: 'green'}}>Submit</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
        </Container>
    </>
  );
};

export default Footer;
