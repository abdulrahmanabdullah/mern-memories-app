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
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
// function getGoogleOauthURL() {
//   const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
//   const options = {
//     redirect_uri: "http://localhost:5000/user/google/auth",
//     client_id: process.env.REACT_APP_GOOGLE_AUTH_ID,
//     access_type: "offline",
//     response_type: "code",
//     prompt: "consent",
//     scope: [
//       "https://www.googleapis.com/auth/userinfo.profile",
//       "https://www.googleapis.com/auth/userinfo.email",
//     ].join(" "),
//   };
//   const qs = new URLSearchParams(options);
//   return `${rootUrl}?${qs}`;
// }
const Auth = () => {
  const { t } = useTranslation();
  //Component styles
  const classes = useStyle();
  //dispatch register and signin actions.
  const dispatch = useDispatch();
  //selector
  // const status = useSelector((state) => state.users.status);
  const { status, message, isLogin, isLogout } = useSelector(
    (state) => state?.users
  );
  // const message = useSelector((state) => state.users.message);
  //component state
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initDataState);
  const [isRegister, setIsRegister] = useState(false);
  const [isNotValdation, setIsNotValdation] = useState(false);
  //React router
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    //When failed to create account.
    if (status === "failed") {
      // show toast here
      toast.error(message, {
        position: "bottom-center",
        autoClose: 1500,
        closeOnClick: true,
      });
    }
    // When login user successfully.
    if (isLogin) {
      toast.success(message);
      //Navigate user to previous page OR go to home when user came from outside of our website.
      navigate(location?.state?.prevPath || "/");
    }
  }, [isLogin, isLogout, navigate, message, status, location]);

  //Callback functions
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      //Dispatch sign up action
      dispatch(register(formData));
      toast.success(message);
      //Navigate user to previous page OR go to home when user came from outside of our website.
      navigate("/");
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

  const googleAuth = () => {
    window.open("http://localhost:5000/google", "_self");
  };
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar>
          <LockOutLinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isRegister ? t("register") : t("login")}
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
                  label={t("firstName")}
                  autoFocus
                  handleOnChange={handleOnChange}
                  fullWidth
                  half
                />
                <Input
                  name="lastName"
                  label={t("lastName")}
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
              label={t("email")}
              handleOnChange={handleOnChange}
            />
            <Input
              name="password"
              label={t("password")}
              type={showPassword ? "text" : "password"}
              handleOnChange={handleOnChange}
              handleShowPassword={handleShowPassword}
            />
            {isRegister && (
              <>
                <Input
                  name="confirmPassword"
                  type="password"
                  label={t("confirmPassword")}
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
              color="custom"
              disabled={isNotValdation}
            >
              {isRegister ? t("register") : t("login")}
            </Button>
            {/* Google OAuth linke. */}
            <Button
              style={{ margin: "10px 0px 0px 15px" }}
              fullWidth
              variant="contained"
              color="custom"
              onClick={googleAuth}
            >
              Google
              {/* <a href={getGoogleOauthURL()}> Countniue with Google </a> */}
            </Button>
          </Grid>
          <Grid justifyContent="flex-start" container>
            <Grid item>
              <Button onClick={switchMode}>
                {isRegister ? t("alreadyHaveAccount") : t("createAccount")}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
