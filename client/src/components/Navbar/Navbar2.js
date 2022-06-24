import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../features/user/userSlice";
import {
  AppBar,
  Typography,
  Toolbar,
  Avatar,
  Button,
  Container,
  IconButton,
  Box,
  Menu,
  Tooltip,
  MenuItem,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useStyle } from "./style";
import logo from "../../assets/memories-Logo.png";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import AdbIcon from "@mui/icons-material/Adb";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import MenuIcon from "@mui/icons-material/Menu";

const MyAppBar = () => {
  const classes = useStyle();
  const [anchorElUser, setAnchorElUser] = useState(null);
  //callbacks func
  const handleOpenNavMenu = (e) => {
    setAnchorElUser(e.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElUser(null);
  };
  const settings = ["Profile", "Dashboard", "SignIn"];
  return (
    <AppBar position="static" className={classes.appBar}>
      <Container maxWidth="xl">
        <Toolbar disableGutters className={classes.toolbar}>
          {/* Logo Icon */}
          <div className={classes.logoAndTitle}>
            <img
              src={logo}
              alt="Memories Icon"
              className={classes.image}
              height="60"
            />
            <Typography variant="h4" noWrap component={Link} to="/">
              Memories
            </Typography>
          </div>
          <Typography variant="h4" noWrap>
            {" "}
            Abdulrahman Abdullah
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <LoginOutlinedIcon fontSize="large" />
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="open settings">
              <IconButton
                onClick={handleOpenNavMenu}
                sx={{ p: 0 }}
                color="inherit"
              >
                <SettingsApplicationsIcon fontSize="large" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseNavMenu}
            >
              {settings.map((s) => (
                <MenuItem key={s} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{s}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
        {/* Logo Icon for small screen */}
      </Container>
    </AppBar>
  );
};

const Navbar2 = () => {
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
  return <MyAppBar />;
  <AppBar
    className={classes.appBarNav}
    component="nav"
    position="static"
    color="inherit"
    style={{ flexDirection: "row" }}
  >
    {/* website title and logo */}
    <div className={classes.brandContainer}>
      <Typography
        variant="h4"
        component={Link}
        to="/"
        className={classes.heading}
      >
        Memories
      </Typography>
      <img
        src={logo}
        alt="Memories Icon"
        className={classes.image}
        height="60"
      />
    </div>
    {/* Toolbar user region */}
    {user && (
      <div className={classes.profile}>
        <Avatar className={classes.purple} alt={user?.result?.name}>
          {user?.result?.name?.charAt(0)}
        </Avatar>
        <Typography className={classes.userName} variant="h6">
          {user?.result?.name}
        </Typography>
      </div>
    )}
    <Toolbar className={classes.Toolbar}>
      <Brightness4Icon style={{ margin: "10px" }} />
      {user ? (
        <div>
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
        <Button component={Link} to="/auth" variant="contained" color="primary">
          Sign In{" "}
        </Button>
      )}
    </Toolbar>
  </AppBar>;
};

export default Navbar2;
