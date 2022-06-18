import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  ButtonBase,
} from "@mui/material";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ThumUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
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
    if (post?.likes?.length > 0) {
      return post?.likes.find(
        (like) => like === (user?.result?._id || user?.result?.googleId)
      ) ? (
        <>
          <ThumUpAltIcon fontSize="small" />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post?.likes.length - 1} others`
            : `${post?.likes.length} like${post?.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlinedIcon fontSize="small" />
          &nbsp;{post?.likes.length}{" "}
          {post?.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        <ThumbUpAltOutlinedIcon fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  const isLoading = false;
  if (isLoading) {
    return (
      <>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            image={post.selectedFile}
            className={classes.media}
            style={{ objectFit: "contain" }}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography gutterBottom variant="body2" component="span">
              creator
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </>
    );
  }
  const openPost = () => {};
  return (
    <Card raised elevation={6} className={classes.card}>
      <ButtonBase component="span" className={classes.baseCard}>
        <CardMedia
          component="img"
          className={classes.media}
          style={{ objectFit: "contain" }}
          image={
            post.selectedFile ||
            "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          }
          title={post.title}
        ></CardMedia>
        {/* Card header */}
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        {/* Edit btn enable if user own his post otherwise disable it */}
        {user?.result?._id === post.creator && (
          <div className={classes.overlay2}>
            <Button
              style={{ color: "white" }}
              size="medium"
              onClick={() => setCurrentId(post._id)}
            >
              <EditSharpIcon fontSize="large" />
            </Button>
          </div>
        )}
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
        <CardContent className={classes.message}>
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
      </ButtonBase>
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
          disabled={user?.result?._id === post.creator ? false : true}
          onClick={() => dispatch(deletePost(post._id))}
        >
          <DeleteIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
