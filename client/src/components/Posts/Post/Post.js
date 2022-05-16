import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ThumUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import { useStyle } from "./style";

const Post = () => {
  const classes = useStyle();
  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image="" />
      {/* Card header */}
      <div className={classes.overlay}>
        <Typography variant="h6">Creator</Typography>
        <Typography variant="body2">moment</Typography>
      </div>
      {/* Edit btn */}
      <div className={classes.overlay2}>
        <Button style={{ color: "white" }} size="small">
          <MoreHorizIcon />
        </Button>
      </div>
      {/* tags */}
      <div className={classes.details}>
        <Typography color="textSecondary" variant="body2" component="p">
          #tags #tags #tags
        </Typography>
      </div>
      {/* Title */}
      <Typography
        className={classes.title}
        gutterBottom
        variant="h5"
        component="h2"
      >
        Title
      </Typography>
      {/* Message */}
      <CardContent>
        <Typography variant="body2" component="p">
          Message
        </Typography>
      </CardContent>
      {/* Like & delete btn */}
      <CardActions className={classes.cardActions}>
        <Button size="small" color="secondary">
          <ThumUpAltIcon />
        </Button>
        <Button size="small" color="secondary">
          <DeleteIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
