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
import { useNavigate, useParams, useLocation } from "react-router-dom";
import LockOutLinedIcon from "@mui/icons-material/LockOutlined";
import { toast } from "react-toastify";
import { useStyle } from "./style";
import Input from "./Input";
import { login, register } from "../../features/user/userSlice";

const initDataState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
function getGoogleOauthURL() {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: "http://localhost:5000/user/google/auth",
    client_id: process.env.REACT_APP_GOOGLE_AUTH_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };
  const qs = new URLSearchParams(options);
  return `${rootUrl}?${qs}`;
}
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
  const [isNotValdation, setIsNotValdation] = useState(false);
  //React router
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  useEffect(() => {
    //When failed to create account.
    if (status === "failed") {
      // show toast here
      toast.error(message, {
        position: "top-center",
        autoClose: 6000,
        closeOnClick: true,
      });
      //redirect to login page.
      navigate("/auth");
    }

    // When create successful .
    if (status === "compelete") {
      toast.success(message);
      //Navigate user to previous page.
      navigate(location.state.prevPath);
    }
  }, [navigate, message, status, location]);

  //Callback functions
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      //Dispatch sign up action
      dispatch(register(formData));
    } else {
      //Dispatch sign in action
      dispatch(login(formData));
    }
  };

  //update input values for a specific key:value in formData object.
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //Change isRegister boolean value
  const handleShowPassword = () => setShowPassword((prevState) => !prevState);

  //Check validation password if do not match that means isNotValidation = true, then disabled button
  const validationPassword = () => {
    if (formData.password !== formData.confirmPassword) {
      setIsNotValdation(true);
      toast.error("Password and confirm password does not match", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
      });
    } else {
      setIsNotValdation(false);
    }
  };
  const switchMode = () => {
    setIsRegister((prevState) => !prevState);
    setShowPassword(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar>
          <LockOutLinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isRegister ? "Register" : "Login"}
        </Typography>
        <form
          onSubmit={handleSubmit}
          className={classes.form}
          disabled={isNotValdation}
        >
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
            {/* Login fields */}
            <Input
              type="email"
              name="email"
              label="email"
              handleOnChange={handleOnChange}
            />
            <Input
              name="password"
              label="password"
              type={showPassword ? "text" : "password"}
              handleOnChange={handleOnChange}
              handleShowPassword={handleShowPassword}
            />
            {isRegister && (
              <>
                <Input
                  name="confirmPassword"
                  type="password"
                  label="Confirm password"
                  handleOnChange={handleOnChange}
                  validationPassword={validationPassword}
                />
              </>
            )}
            <Button
              fullWidth
              type="submit"
              style={{ margin: "10px 0px 0px 15px" }}
              variant="contained"
              color="primary"
              disabled={isNotValdation}
            >
              {isRegister ? "Register" : "Login"}
            </Button>
            {/* Google OAuth linke. */}
            <Button
              style={{ margin: "10px 0px 0px 15px" }}
              fullWidth
              variant="contained"
              color="primary"
            >
              <a href={getGoogleOauthURL()}> Countniue with Google </a>
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
