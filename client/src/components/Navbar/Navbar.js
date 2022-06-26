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
  Tooltip,
  Drawer,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Divider,
  ButtonGroup,
} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

import { useStyle } from "./style";
import logo from "../../assets/memories-Logo.png";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";

//Drawer Component
const DrawerNav = () => {
  const classes = useStyle();
  const theme = useTheme();
  console.log(theme);

  const [state, setState] = useState({
    right: false,
    left: false,
  });

  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
    setIsOpen((prev) => !prev);
  };
  const drawerList = (anchor) => (
    <Box
      role="presentation"
      sx={{ width: 350, p: 1 }}
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, )}
    >
      <Typography variant="h4" component="p">
        Settings
      </Typography>
      <Divider />
      <Box sx={{ width: "100%", my: 1, px: 3 }}>
        {/* Mode Light OR Dark */}
        <Typography variant="body2" sx={{ py: 1 }}>
          Mode
        </Typography>
        <ButtonGroup
          fullWidth
          variant="outlined"
          aria-label="outlined button group"
        >
          <Button>Light</Button>
          <Button>Dark</Button>
        </ButtonGroup>
        {/* Direction */}
        {/* Language */}
      </Box>
    </Box>
  );
  return (
    <div>
      <React.Fragment key="right">
        <IconButton
          onClick={toggleDrawer("right", isOpen)}
          sx={{ p: 0 }}
          color="inherit"
        >
          <SettingsApplicationsIcon fontSize="large" />
          <Drawer
            anchor="right"
            open={isOpen}
            onClose={toggleDrawer("right", isOpen)}
          >
            {drawerList("right")}
          </Drawer>
        </IconButton>
      </React.Fragment>
    </div>
  );
};
const Navbar = () => {
  const classes = useStyle();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location, setUser]);

  //callbacks func
  const handleLogout = () => {
    dispatch(logout());
    setUser(null);
  };
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
              <DrawerNav />
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
