import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Avatar,
  Grid,
  Button,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import LockOutLinedIcon from "@mui/icons-material/LockOutlined";
import { toast } from "react-toastify";
import { useStyle } from "./style";
import Input from "./Input";
import { register } from "../../features/user/userSlice";

const initDataState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassowrd: "",
};
const Auth = () => {
  //Component styles
  const classes = useStyle();
  //dispatch register and signin actions.
  const dispatch = useDispatch();
  //selector
  const status = useSelector((state) => state.users.status);
  const message = useSelector((state) => state.users.message);
  //component state
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initDataState);
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    //When failed to create account.
    if (status === "failed") {
      // show toast here
      toast.error(message, {
        position: "top-center",
        autoClose: 6000,
        closeOnClick: true,
      });
      //use rest dipsatch OR redirect to login page.
      navigate("/auth");
    }

    // When create successful .
    if (status === "compelete") {
      toast.success(message);
      navigate("/");
    }
  }, [navigate, message, status]);

  //Callback functions
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      //Dispatch sign up action
      dispatch(register(formData));
    } else {
      //Dispatch sign in action
    }
  };

  //update input values for a specific key:value in formData object.
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //Change isRegister boolean value
  const handleShowPassword = () => setShowPassword((prevState) => !prevState);

  const switchMode = () => {
    setIsRegister((prevState) => !prevState);
    setShowPassword(false);
  };

  //Google callback functions
  const googleSuccess = async (res) => {
    const result = await res?.profileObj;
    console.log(res.scope);
  };

  const googleFailure = (err) => {
    console.log(err);
  };

  //Customes google login button
  const googleLogin = useGoogleLogin({
    onSuccess: googleSuccess,
    onFailure: googleFailure,
    scope: "email profile",
  });

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar>
          <LockOutLinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isRegister ? "Register" : "Login"}
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          <Grid container spacing={2}>
            {/* If user already have account, show login form */}
            {isRegister && (
              <>
                <Input
                  name="firstName"
                  label="first name"
                  autoFocus
                  handleOnChange={handleOnChange}
                  fullWidth
                  half
                />
                <Input
                  name="lastName"
                  label="last name"
                  handleOnChange={handleOnChange}
                  fullWidth
                  half
                />
              </>
            )}
            <Input
              type="email"
              name="email"
              label="email"
              handleOnChange={handleOnChange}
            />
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              label="password"
              handleonChange={handleOnChange}
              handleShowPassword={handleShowPassword}
            />
            {isRegister && (
              <Input
                name="confirmPassword"
                type="password"
                label="repeat password"
                handleOnChange={handleOnChange}
              />
            )}
            {/* <GoogleLogin onSuccess={googleSuccess} onFailure={googleFailure} /> */}
            <Button
              fullWidth
              type="submit"
              style={{ margin: "10px 0px 0px 15px" }}
              variant="contained"
              color="primary"
            >
              {isRegister ? "Register" : "Login"}
            </Button>
            {/* Google Auth */}
            <Button
              style={{ margin: "10px 0px 0px 15px" }}
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => googleLogin()}
            >
              Google btn
            </Button>
          </Grid>
          <Grid justifyContent="flex-end" container>
            <Grid item>
              <Button onClick={switchMode}>
                {isRegister
                  ? "Already have an account? Sign in"
                  : "Create new Account"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
