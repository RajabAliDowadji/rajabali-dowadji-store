import React from "react";
import { Box, Grid } from "@mui/material";
import "./LoginPage.web.css";
import LoginForm from "../../Components/Login/LoginForm.web";
import { Login_Poster_Image } from "./assets";
import ImageGrid from "../../Components/ImageGrid/ImageGrid.web";

const LoginPage = () => {
  return (
    <Grid container>
      <Grid item xs={12} lg={6} md={6}>
        <Box className="LoginPage_LogoBox">
          <ImageGrid ImageSrc={Login_Poster_Image} />
        </Box>
      </Grid>
      <Grid item xs={12} lg={6} md={6}>
        <Box className="LoginPage_FormBox">
          <LoginForm />
        </Box>
      </Grid>
    </Grid>
  );
};
export default LoginPage;
