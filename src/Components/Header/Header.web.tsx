import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { White_logo } from "../Header/assets";
import { Link, useNavigate } from "react-router-dom";
import "./Header.web.css";
const Header = () => {
  const [userData, setUserData] = useState<any>(null);
  const navigate = useNavigate();
  const auth = localStorage.getItem("user_data");
  useEffect(() => {
    if (auth) {
      setUserData(JSON.parse(auth));
    } else {
      setUserData(null);
    }
  }, [auth, navigate]);
  const logoutClickHandler = () => {
    localStorage.removeItem("user_data");
    localStorage.removeItem("token");
  };
  return (
    <Box className="Header_mainBox">
      <Grid container className="Header_mainGrid">
        <Grid item xs={2} lg={2} md={2}>
          <img
            src={White_logo}
            alt="white_logo_image"
            className="Header_whiteLogoImage"
          />
        </Grid>
        <Grid item xs={6} lg={6} md={6}>
          Pending
        </Grid>
        <Grid item xs={4} lg={4} md={4}>
          <Grid container className="Header_TabMainHeader">
            <Grid item xs={2} lg={2} md={2} className="Header_TabGrid">
              <Link to="/" className="Header_TabGridLink">
                About
              </Link>
            </Grid>
            <Grid item xs={2} lg={2} md={2} className="Header_TabGrid">
              <Link to="/" className="Header_TabGridLink">
                Contact us
              </Link>
            </Grid>
            <Grid item xs={2} lg={2} md={2} className="Header_TabGrid">
              <Link to="/" className="Header_TabGridLink">
                products
              </Link>
            </Grid>
            <Grid item xs={2} lg={2} md={2} className="Header_TabGrid">
              <Link to="/" className="Header_TabGridLink">
                My orders
              </Link>
            </Grid>
            {userData != null ? (
              <>
                <Grid item xs={2} lg={2} md={2} className="Header_TabGrid">
                  <Link to="/" className="Header_TabGridLink">
                    Hello, {userData.username}
                  </Link>
                </Grid>
                <Grid item xs={2} lg={2} md={2} className="Header_TabGrid">
                  <Link
                    to="/"
                    className="Header_TabGridLink"
                    onClick={logoutClickHandler}
                  >
                    Logout
                  </Link>
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={2} lg={2} md={2} className="Header_TabGrid">
                  <Link to="/sign-up" className="Header_TabGridLink">
                    Register
                  </Link>
                </Grid>
                <Grid item xs={2} lg={2} md={2} className="Header_TabGrid">
                  <Link to="/login" className="Header_TabGridLink">
                    Login
                  </Link>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Header;
