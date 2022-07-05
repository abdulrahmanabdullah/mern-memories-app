import { makeStyles } from "@mui/styles";

export const useStyle = makeStyles((theme) => ({
  media: {
    borderRadius: "20px",
    objectFit: "cover",
    width: "100%",
    maxHeight: "600px",
  },
  card: {
    display: "flex",
    width: "100%",
    flexDirection: "column-reverse",
    [theme.breakpoints.down("md")]: {
      flexWrap: "wrap",
    },
    [theme.breakpoints.down("sm")]: {
      flexWrap: "wrap",
    },
  },
  section: {
    borderRadius: "20px",
    margin: "10px",
    flex: 1,
  },
  skeleton: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  postsSection: {
    margin: "15px",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  imageSection: {
    marginLeft: "20px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
      maxHeight: "300px",
    },
  },
  imagePost: {
    borderRadius: "20px",
    objectFit: "cover",
    width: "100%",
    maxHeight: "500px",
    [theme.breakpoints.down("sm")]: {
      maxHeight: "250px",
    },
  },
  recommendedPosts: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  loadingPaper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    borderRadius: "15px",
    height: "39vh",
  },
  commentsOuterContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  commentsInnerContainer: {
    height: "250px",
    marginRight: "30px",
    overflowY: "auto",
  },
  writeCommentsArea: {
    width: "80%",
    position: "relative",
    left: "5%",
    // "& .Mui-focused": {
    //   border: "white",
    //   borderWidth: "3px",
    //   "& .MuiOutlinedInput-notchedOutline": {
    //     border: "0.1px solid white",
    //     borderWidth: "3px",
    //   },
    // },
  },
  subHeader: {
    padding: "5px",
    fontSize: "1.5rem",
    fontWeight: "100",
  },
}));
