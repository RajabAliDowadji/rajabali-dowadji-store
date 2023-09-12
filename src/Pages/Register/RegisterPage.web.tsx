import React from "react";
import { Box, Grid } from "@mui/material";
import "./RegisterPage.web.css";
import RegisterForm from "../../Components/Register/RegisterForm.web";
import { Rider_Image } from "./assets";
import ImageGrid from "../../Components/ImageGrid/ImageGrid.web";

const RegisterPage = () => {
  return (
    <Grid container>
      <Grid item xs={12} lg={6} md={6}>
        <Box className="RegisterPage_LogoBox">
          <ImageGrid ImageSrc={Rider_Image} />
        </Box>
      </Grid>
      <Grid item xs={12} lg={6} md={6}>
        <Box className="RegisterPage_FormBox">
          <RegisterForm />
        </Box>
      </Grid>
    </Grid>
  );
};
export default RegisterPage;
