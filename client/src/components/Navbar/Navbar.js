import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../features/user/userSlice";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useStyle } from "./style";

const Navbar = () => {
  const classes = useStyle();
  //Get user from redux .
  // const user = useSelector((state) => state.users.user);
  //component state
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const dispatch = useDispatch();
  // navigation
  const navigate = useNavigate();
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [setUser]);

  //callback functions
  const logoutBtn = () => {
    // dispatch to remove profile from localstorage.
    dispatch(logout());
    setUser(null);
    navigate("/");
  };
  return (
    <div>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.brandContainer}>
          {/* website title and logo */}
          <Typography
            variant="h2"
            component={Link}
            to="/"
            className={classes.heading}
          >
            Social media app
          </Typography>
          <img src="" alt="logo" className={classes.image} height="60" />
        </div>
        {/* Toolbar user region */}
        <Toolbar className={classes.Toolbar}>
          {user ? (
            <div className={classes.profile}>
              <Avatar className={classes.purple} alt={user?.result?.name}>
                {user?.result?.name?.charAt(0)}
              </Avatar>
              <Typography className={classes.userName} variant="h6">
                {user?.result?.name}
              </Typography>
              <Button
                className={classes.logout}
                variant="contained"
                color="secondary"
                onClick={logoutBtn}
              >
                {" "}
                Logout
              </Button>
            </div>
          ) : (
            <Button
              component={Link}
              to="/auth"
              variant="contained"
              color="primary"
            >
              Sign In{" "}
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
