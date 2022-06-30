import { makeStyles } from "@mui/styles";

export const useStyle = makeStyles((theme) => ({
  media: {
    height: "150px",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  fullHeightCard: {
    height: "100%",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "15px",
    height: "100%",
    position: "relative",
  },
  baseCard: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    maxHeight: "200px",
  },
  overlay: {
    position: "absolute",
    top: "20px",
    left: "20px",
    color: "white",
  },
  overlay2: {
    position: "absolute",
    top: "20px",
    right: "20px",
    color: "white",
  },
  grid: {
    display: "flex",
  },
  title: {
    padding: "0 10px",
    width: "100%",
    justifyContent: "start",
  },
  message: {
    width: "100%",
    justifyContent: "start",
    margin: "10px",
  },
  details: {
    display: "flex",
    justifyContent: "start",
    width: "100%",
    margin: "10px",
    padding: "10px",
  },
  cardActions: {
    padding: "0 16px 8px 16px",
    display: "flex",
    justifyContent: "space-between",
  },
}));
