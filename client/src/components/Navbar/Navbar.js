import React, { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../features/user/userSlice";
import { useTranslation } from "react-i18next";
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
  const { t, i18n } = useTranslation();
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
      <Typography variant="h4" component="p" sx={{ textAlign: "center" }}>
        {t("settings")}
      </Typography>
      <Divider />
      <Box sx={{ width: "100%", my: 1, px: 3 }}>
        {/* Mode Light OR Dark */}
        <Typography variant="body2" sx={{ py: 1, textAlign: "center" }}>
          {t("mode")}
        </Typography>
        <ButtonGroup
          fullWidth
          variant="outlined"
          aria-label="outlined button group"
        >
          <Button
            color="buttonGroup"
            onClick={() => themeContext.toggleColorMode("light")}
          >
            {t("light")}
          </Button>
          <Button
            color="buttonGroup"
            onClick={() => themeContext.toggleColorMode("dark")}
          >
            {t("dark")}
          </Button>
        </ButtonGroup>
        {/* Language */}
      </Box>
      {/* Change direction By language */}
      <Box sx={{ width: "100%", my: 1, px: 3 }}>
        {/* Mode Light OR Dark */}
        <Typography variant="body2" sx={{ py: 1, textAlign: "center" }}>
          {t("language")}
        </Typography>
        <ButtonGroup
          fullWidth
          variant="outlined"
          aria-label="outlined button group"
        >
          <Button
            color="buttonGroup"
            onClick={() => {
              document.dir = "ltr";
              themeContext.toggleDirection("ltr");
              i18n.changeLanguage("en");
            }}
          >
            {t("english")}
          </Button>
          <Button
            color="buttonGroup"
            onClick={() => {
              document.dir = "rtl";
              themeContext.toggleDirection("rtl");
              i18n.changeLanguage("ar");
            }}
          >
            {t("arabic")}
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
  const slideDirection = t("drawerDirection");

  return (
    <div>
      <React.Fragment key="left">
        <IconButton
          onClick={toggleDrawer(slideDirection, isOpen)}
          sx={{ p: 0 }}
          color="appbarContentColors"
        >
          <SettingsApplicationsIcon fontSize="large" />
          <Drawer
            anchor={slideDirection}
            PaperProps={{
              style: {
                borderRadius: 0,
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
  const { t } = useTranslation();

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
            <Typography
              className={classes.txtColor}
              style={{ textDecoration: "none" }}
              variant="h4"
              noWrap
              component={Link}
              to="/"
            >
              {t("memories")}
            </Typography>
          </div>
          <Typography
            className={classes.txtColor}
            variant="h4"
            noWrap
            style={{ flex: "0.7" }}
          >
            {user?.result?.name}
          </Typography>
          {/* Login and logout logic */}
          {user ? (
            <IconButton color="appbarContentColors" onClick={handleLogout}>
              <LogoutOutlinedIcon fontSize="large" />
            </IconButton>
          ) : (
            <Link to="/auth" state={{ prevPath: location.pathname }}>
              <IconButton color="appbarContentColors">
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
