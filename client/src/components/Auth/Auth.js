import React, { useState } from "react";
import {
  Container,
  Paper,
  Avatar,
  Grid,
  Button,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import LockOutLinedIcon from "@mui/icons-material/LockOutlined";
import { useStyle } from "./style";
import Input from "./Input";
import Icon from "./Icon";

const Auth = () => {
  //Component styles
  const classes = useStyle();
  //dispatch
  const dispatch = useDispatch();
  //component state
  const [isSignUp, setIsSignUp] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  //Callback functions
  const handleSubmit = (e) => {};

  const handleOnChange = () => {};

  const handleShowPassword = () => setShowPassword((prevState) => !prevState);

  const switchMode = () => {
    setIsSignUp((prevState) => !prevState);
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
          {isSignUp ? "Sign Up" : "Sign In"}
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          <Grid container spacing={2}>
            {/* If user already have account, show login form */}
            {isSignUp && (
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
            {isSignUp && (
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
              {isSignUp ? "Sign up" : "Sign in"}
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
                {isSignUp
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
