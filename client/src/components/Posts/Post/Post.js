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
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../features/posts/postSlice";

import { useStyle } from "./style";

const Post = ({ post, setCurrentId }) => {
  //component style
  const classes = useStyle();
  //dispatch
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  //Like component
  const Like = () => {
    //check length likes
    if (post.likes.length > 0) {
      return post.likes.find(
        (like) => like === (user?.result?._id || user?.result?.googleId)
      ) ? (
        <>
          <ThumUpAltIcon fontSize="small" />
          &nbsp; first con
          {post.likes.length > 2
            ? `You and other ${post.likes.length - 1}`
            : `${post.likes.length} like`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlinedIcon />
          &nbsp;Like {post.likes.length}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlinedIcon />
        &nbsp;like
      </>
    );
  };
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={
          post.selectedFile ||
          "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
        }
      />
      {/* Card header */}
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      {/* Edit btn */}
      <div className={classes.overlay2}>
        <Button
          style={{ color: "white" }}
          size="small"
          onClick={() => setCurrentId(post._id)}
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
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={() => dispatch(likePost(post._id))}
        >
          <Like />
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => dispatch(deletePost(post._id))}
        >
          <DeleteIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
