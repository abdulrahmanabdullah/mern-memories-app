import React, { useState, useEffect, useContext } from "react";
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
  Divider,
  ButtonGroup,
} from "@mui/material";
import { useTheme } from "@mui/styles";
import { Link, useLocation } from "react-router-dom";
import ThemeContext from "../../themeContext";
import { useStyle } from "./style";
import logo from "../../assets/memories-Logo.png";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
//TODO: Fix Drawer direction when change left to right and rtl to ltr.
//Drawer Component
const DrawerNav = () => {
  const themeContext = useContext(ThemeContext);
  const theme = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = (anchor, open) => (event) => {
    console.log("direction = ", anchor);

    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsOpen((prev) => !prev);
  };
  const drawerList = (anchor) => (
    <Box role="presentation" sx={{ width: 350, p: 1 }}>
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
          <Button onClick={() => themeContext.toggleColorMode("light")}>
            Light
          </Button>
          <Button onClick={() => themeContext.toggleColorMode("dark")}>
            Dark
          </Button>
        </ButtonGroup>
        {/* Language */}
      </Box>
      {/* Direction */}
      <Box sx={{ width: "100%", my: 1, px: 3 }}>
        {/* Mode Light OR Dark */}
        <Typography variant="body2" sx={{ py: 1 }}>
          Direction
        </Typography>
        <ButtonGroup
          fullWidth
          variant="outlined"
          aria-label="outlined button group"
        >
          <Button
            onClick={() => {
              document.dir = "ltr";
              themeContext.toggleDirection("ltr");
            }}
          >
            Left
          </Button>
          <Button
            onClick={() => {
              document.dir = "rtl";
              themeContext.toggleDirection("rtl");
            }}
          >
            Right
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
  const slideDirection = theme.direction === "ltr" ? "left" : "right";

  return (
    <div>
      <React.Fragment key="left">
        <IconButton
          onClick={toggleDrawer(slideDirection, isOpen)}
          sx={{ p: 0 }}
          color="inherit"
        >
          <SettingsApplicationsIcon fontSize="large" />
          <Drawer
            anchor={slideDirection}
            PaperProps={{
              style: {
                borderRadius: 0,
                left: slideDirection === "right" ? 0 : "unset",
                right: slideDirection === "right" ? "unset" : 0,
                direction: "ltr",
              },
            }}
            open={isOpen}
            onClose={toggleDrawer(slideDirection, isOpen)}
          >
            {drawerList(slideDirection)}
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
