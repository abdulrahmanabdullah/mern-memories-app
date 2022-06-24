import { makeStyles } from "@mui/styles";
import { deepPurple } from "@mui/material/colors";

export const useStyle = makeStyles((theme) => ({
  appBar: {
    margin: "5px 0px 30px 0px",
    height: "5%",
  },
  appBarNav: {
    borderRadius: 15,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 15px",
  },
  logoAndTitle: {
    display: "flex",
    flex: "0.6",
    fontWeight: 500,
    letterSpacing: ".3rem",
    color: "inherit",
    textDecoration: "none",
    marginRight: 2,
    fontFamily: "monospace",
    "& a": {
      [theme.breakpoints.down("md")]: {
        fontSize: "1.8rem",
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: "1.2rem",
      },
    },
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    "& h4": {
      [theme.breakpoints.down("md")]: {
        letterSpacing: ".1rem",
        fontSize: "20px",
        textDecoration: "none",
        fontFamily: "monospace",
        justifyContent: "space-around",
      },
    },
    [theme.breakpoints.down("sm")]: {
      justifyContent: "start",
    },
  },
  heading: {
    color: "rgba(0,183,255, 1)",
    textDecoration: "none",
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
    },
  },
  image: {
    marginLeft: "15px",
    objectFit: "contain",
    maxHeight: "40px",
    [theme.breakpoints.down("md")]: {
      maxHeight: "30px",
    },
    [theme.breakpoints.down("sm")]: {
      maxHeight: "20px",
    },
  },

  profile: {
    display: "flex",
    justifyContent: "space-around",
  },
  userName: {
    display: "flex",
    alignItems: "center",
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));
