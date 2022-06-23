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
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletePost } from "../../../features/posts/postSlice";

import { useStyle } from "./style";
import Like from "./Like";

const Post = ({ post, setCurrentId }) => {
  //component style
  const classes = useStyle();
  // user Auth
  const user = JSON.parse(localStorage.getItem("profile"));
  //dispatch
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //callback func
  const openPost = () => navigate(`/post/${post._id}`);

  return (
    <Card raised elevation={6} className={classes.card}>
      <ButtonBase
        onClick={openPost}
        component="span"
        className={classes.baseCard}
      >
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
        {/* Like component */}
        <Like post={post} user={user} />
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
