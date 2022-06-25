import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../features/user/userSlice";
import {
  AppBar,
  Typography,
  Toolbar,
  Container,
  IconButton,
  Box,
  Menu,
  Tooltip,
  MenuItem,
} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useStyle } from "./style";
import logo from "../../assets/memories-Logo.png";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import AdbIcon from "@mui/icons-material/Adb";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const classes = useStyle();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location, setUser]);

  //callbacks func
  const handleOpenNavMenu = (e) => {
    setAnchorElUser(e.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    setUser(null);
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
          <Typography variant="h4" noWrap style={{ flex: "0.7" }}>
            {user?.result?.name}
          </Typography>
          {/* Login and logout logic */}
          {user ? (
            <IconButton color="inherit" onClick={handleLogout}>
              <LogoutOutlinedIcon fontSize="large" />
            </IconButton>
          ) : (
            <Link to="/auth" state={{ prevPath: location.pathname }}>
              <IconButton color="inherit">
                <LoginOutlinedIcon fontSize="large" />
              </IconButton>
            </Link>
          )}
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
      </Container>
    </AppBar>
  );
};

export default Navbar;
