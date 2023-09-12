import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import "./RegisterForm.web.css";
import { google_Icon } from "./assets";
import { Link, useNavigate } from "react-router-dom";
import {
  emailValidate,
  isEmpty,
  onChangeInputFieldValidations,
  passwordValidate,
} from "../../Validations/userValidations.web";
import { addUserRegisterApi } from "../../Services/addRegisterUser.api";
const configJSON = require("../../Constants/User.Config");

const RegisterForm = () => {
  const navigate = useNavigate();
  const initialRegisterFormUserData = {
    username: "",
    email: "",
    password: "",
    register_type: "email_type",
    account_type: "user",
  };
  const [registerFormUserData, setRegisterFormUserData] = useState(
    initialRegisterFormUserData
  );
  const [formDataError, setFormDataError] = useState({
    errors: {
      username: false,
      email: false,
      password: false,
    },
    errorMsg: {
      username: "",
      email: "",
      password: "",
    },
  });
  const inputHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isValid = onChangeInputFieldValidations(event);
    setRegisterFormUserData((prev) => ({
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
    const isUserNameValid = isEmpty("username", registerFormUserData.username);
    const isEmailValid = emailValidate("email", registerFormUserData.email);

    const isPasswordValid = passwordValidate(
      "password",
      registerFormUserData.password
    );
    setFormDataError((prev) => ({
      ...prev,
      errors: {
        ...formDataError.errors,
        username: isUserNameValid.status,
        email: isEmailValid.status,
        password: isPasswordValid.status,
      },
      errorMsg: {
        ...formDataError.errorMsg,
        username: isUserNameValid.message,
        email: isEmailValid.message,
        password: isPasswordValid.message,
      },
    }));
    if (
      !formDataError.errors.username &&
      !formDataError.errors.email &&
      !formDataError.errors.password
    ) {
      const response: any = await addUserRegisterApi(registerFormUserData);
      if (response.data) {
        localStorage.setItem("user_data", JSON.stringify(response.data));
        localStorage.setItem("auth_token", response.meta.token);
        setRegisterFormUserData(initialRegisterFormUserData);
        navigate("/");
      }
    }
  };
  return (
    <form onSubmit={addUserHandler}>
      <Box className="RegisterForm_MainBox">
        <Box className="RegisterForm_AlreadyLoginTxtBox">
          <Box className="RegisterForm_AlreadyLoginTxt">
            {configJSON.alreadyLoginTxt}
          </Box>
          <Link
            to={"/login"}
            className="RegisterForm_AlreadyLoginTxt RegisterForm_LoginTxt"
          >
            {configJSON.loginTxt}
          </Link>
        </Box>
        <Box className="RegisterForm_SubMainBox">
          <Box className="RegisterForm_welcomeTxtBox">
            <Box>{configJSON.registerwelcomeTxt}</Box>
            <Box className="RegisterForm_storeTxt">{configJSON.rdStoreTxt}</Box>
          </Box>
          <Box className="RegisterForm_TextFieldBox">
            <Typography className="RegisterForm_TextFieldLabel">
              {configJSON.userNameTxt}
            </Typography>
            <TextField
              id="standard-basic"
              name="username"
              placeholder="Please enter your name"
              className="input_props RegisterForm_TextField"
              variant="outlined"
              value={registerFormUserData.username}
              onChange={inputHandleChange}
              error={formDataError.errors.username}
              helperText={formDataError.errorMsg.username}
              InputProps={{
                className: "login_forrmInput_textfield",
              }}
            />
          </Box>
          <Box className="RegisterForm_TextFieldBox">
            <Typography className="RegisterForm_TextFieldLabel">
              {" "}
              {configJSON.emailTxt}
            </Typography>
            <TextField
              id="standard-basic"
              name="email"
              placeholder="Please enter your email"
              className="input_props RegisterForm_TextField"
              variant="outlined"
              value={registerFormUserData.email}
              onChange={inputHandleChange}
              error={formDataError.errors.email}
              helperText={formDataError.errorMsg.email}
            />
          </Box>
          <Box className="RegisterForm_TextFieldBox">
            <Typography className="RegisterForm_TextFieldLabel">
              {configJSON.passwordTxt}
            </Typography>
            <TextField
              id="standard-basic"
              name="password"
              placeholder="Please enter your password"
              className="input_props RegisterForm_TextField"
              variant="outlined"
              type="password"
              value={registerFormUserData.password}
              onChange={inputHandleChange}
              error={formDataError.errors.password}
              helperText={formDataError.errorMsg.password}
            />
          </Box>
          <Button
            className="RegisterForm_SubmitBtn"
            disableRipple
            type="submit"
          >
            Submit
          </Button>
          <Box className="RegisterForm_orTxt">{configJSON.orTxt}</Box>
          <Button className="RegisterForm_GoogleSignup" disableRipple>
            <img
              src={google_Icon}
              alt="Google_Icon"
              className="RegisterForm_GoogleSignupLogo"
            />
            {configJSON.signupWithGoogleTxt}
          </Button>
        </Box>
      </Box>
    </form>
  );
};
export default RegisterForm;
