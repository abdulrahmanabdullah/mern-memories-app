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
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, selectPost } from "../../../features/posts/postSlice";

import { useStyle } from "./style";

const Post = ({ post }) => {
  //component style
  const classes = useStyle();
  //dispatch
  const dispatch = useDispatch();
  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={post.selectedFile} />
      {/* Card header */}
      <div className={classes.overlay}>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      {/* Edit btn */}
      <div className={classes.overlay2}>
        <Button
          style={{ color: "white" }}
          size="small"
          onClick={() => dispatch(selectPost(post._id))}
        >
          <MoreHorizIcon />
        </Button>
      </div>
      {/* Title */}
      <Typography
        className={classes.title}
        gutterBottom
        variant="h5"
        component="h2"
      >
        {post.title}
      </Typography>
      {/* Message */}
      <CardContent>
        <Typography variant="body2" component="p">
          {post.message}
        </Typography>
      </CardContent>
      {/* tags */}
      <div className={classes.details}>
        <Typography color="textSecondary" variant="body2" component="p">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      {/* Like & delete btn */}
      <CardActions className={classes.cardActions}>
        <Button size="small" color="secondary">
          <ThumUpAltIcon />
        </Button>
        <Button
          size="small"
          color="secondary"
          onClick={() => dispatch(deletePost(post._id))}
        >
          <DeleteIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
