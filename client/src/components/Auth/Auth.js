import React, { useState } from "react";
import {
  Container,
  Paper,
  Avatar,
  Grid,
  Button,
  Typography,
} from "@mui/material";

import { GoogleLogin } from "react-google-login";
import LockOutLinedIcon from "@mui/icons-material/LockOutlined";
import { useStyle } from "./style";
import Input from "./Input";
import Icon from "./Icon";

const Auth = () => {
  //Component styles
  const classes = useStyle();
  //component state
  const [isSignUp, setIsSignUp] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  //Callback functions
  const handleSubmit = () => {};

  const handleOnChange = () => {};

  const handleShowPassword = () => setShowPassword((prevState) => !prevState);

  const switchMode = () => {
    setIsSignUp((prevState) => !prevState);
    setShowPassword(false);
  };

  //Google callback functions
  const googleSuccess = (res) => {
    console.log(res);
  };
  const googleFailure = () => {};

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
            {/* Google Auth */}
            <GoogleLogin
              clientId="590787789414-cvn275c22khj6t2p2b7g4gfj6ch8akhc.apps.googleusercontent.com"
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              render={(propsRender) => (
                <Button
                  onClick={propsRender.onClick}
                  disabled={propsRender.disabled}
                  fullWidth
                  color="primary"
                  className={classes.googleButton}
                  startIcon={<Icon />}
                >
                  Google Sign In
                </Button>
              )}
            />
            <Button
              fullWidth
              type="submit"
              style={{ margin: "10px 0px 0px 15px" }}
              variant="contained"
              color="primary"
            >
              {isSignUp ? "Sign up" : "Sign in"}
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
