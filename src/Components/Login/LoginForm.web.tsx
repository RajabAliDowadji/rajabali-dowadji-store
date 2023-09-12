import React, { useState } from "react";
import "./LoginForm.web.css";
import { google_Icon } from "./assets";
import { Link, useNavigate } from "react-router-dom";
import {
  emailValidate,
  onChangeInputFieldValidations,
  passwordValidate,
} from "../../Validations/userValidations.web";
import { Box, Button, TextField, Typography } from "@mui/material";
import { userLoginApi } from "../../Services/userLogin.api";
const configJSON = require("../../Constants/Users");

const LoginForm = () => {
  const navigate = useNavigate();
  const initialLoginFormUserData = {
    email: "",
    password: "",
  };
  const [loginFormUserData, setLoginFormUserData] = useState(
    initialLoginFormUserData
  );
  const [formDataError, setFormDataError] = useState({
    errors: {
      email: false,
      password: false,
    },
    errorMsg: {
      email: "",
      password: "",
    },
  });
  const inputHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isValid = onChangeInputFieldValidations(event);
    setLoginFormUserData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    setFormDataError((prev) => ({
      ...prev,
      errors: { ...formDataError.errors, [event.target.name]: false },
      errorMsg: {
        ...formDataError.errorMsg,
        [event.target.name]: "",
      },
    }));
    setFormDataError((prev) => ({
      ...prev,
      errors: { ...formDataError.errors, [event.target.name]: isValid.error },
      errorMsg: {
        ...formDataError.errorMsg,
        [event.target.name]: isValid.message,
      },
    }));
  };
  const addUserHandler = async (event: any) => {
    event.preventDefault();
    const isEmailValid = emailValidate("email", loginFormUserData.email);

    const isPasswordValid = passwordValidate(
      "password",
      loginFormUserData.password
    );
    setFormDataError((prev) => ({
      ...prev,
      errors: {
        ...formDataError.errors,
        email: isEmailValid.status,
        password: isPasswordValid.status,
      },
      errorMsg: {
        ...formDataError.errorMsg,
        email: isEmailValid.message,
        password: isPasswordValid.message,
      },
    }));
    if (!formDataError.errors.email && !formDataError.errors.password) {
      const response: any = await userLoginApi(loginFormUserData);
      if (response.data) {
        localStorage.setItem("user_data", JSON.stringify(response.data));
        localStorage.setItem("auth_token", response.meta.token);
        setLoginFormUserData(initialLoginFormUserData);
        if (response.data.account_type === "super_admin") {
          navigate("/super-admin");
        } else {
          navigate("/");
        }
      }
    }
  };
  return (
    <form onSubmit={addUserHandler}>
      <Box className="LoginForm_MainBox">
        <Box className="LoginForm_AlreadyLoginTxtBox">
          <Box className="LoginForm_AlreadyLoginTxt">
            {configJSON.newUserRegisterTxt}
          </Box>
          <Link
            to={"/sign-up"}
            className="LoginForm_AlreadyLoginTxt LoginForm_LoginTxt"
          >
            {configJSON.registerTxt}
          </Link>
        </Box>
        <Box className="LoginForm_SubMainBox">
          <Box className="LoginForm_welcomeTxtBox">
            <Box>{configJSON.loginTxt}</Box>
          </Box>
          <Box className="LoginForm_TextFieldBox">
            <Typography className="LoginForm_TextFieldLabel">
              {" "}
              {configJSON.emailTxt}
            </Typography>
            <TextField
              id="standard-basic"
              name="email"
              placeholder="Please enter your email"
              className="input_props LoginForm_TextField"
              variant="outlined"
              value={loginFormUserData.email}
              onChange={inputHandleChange}
              error={formDataError.errors.email}
              helperText={formDataError.errorMsg.email}
            />
          </Box>
          <Box className="LoginForm_TextFieldBox">
            <Typography className="LoginForm_TextFieldLabel">
              {configJSON.passwordTxt}
            </Typography>
            <TextField
              id="standard-basic"
              name="password"
              placeholder="Please enter your password"
              className="input_props LoginForm_TextField"
              variant="outlined"
              type="password"
              value={loginFormUserData.password}
              onChange={inputHandleChange}
              error={formDataError.errors.password}
              helperText={formDataError.errorMsg.password}
            />
          </Box>
          <Button className="LoginForm_SubmitBtn" disableRipple type="submit">
            Login
          </Button>
          <Box className="LoginForm_orTxt">{configJSON.orTxt}</Box>
          <Button className="LoginForm_GoogleSignup" disableRipple>
            <img
              src={google_Icon}
              alt="Google_Icon"
              className="LoginForm_GoogleLoginLogo"
            />
            {configJSON.loginWithGoogleTxt}
          </Button>
        </Box>
      </Box>
    </form>
  );
};
export default LoginForm;
