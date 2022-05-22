import React from "react";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useStyle } from "./style";

const Navbar = () => {
  const classes = useStyle();
  const user = null;
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
              <Avatar className={classes.purple} alt={user.result.name}>
                {user.result.name.chartAt(0)}
              </Avatar>
              <Typography className={classes.userName} variant="h6">
                {user.result.name}
              </Typography>
              <Button
                className={classes.logout}
                variant="contained"
                color="secondary"
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
