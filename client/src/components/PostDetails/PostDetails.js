import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost, postBySearch } from "../../features/posts/postSlice";
import { Paper, Skeleton, Typography, Divider } from "@mui/material";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import { useStyle } from "./style";
const PostDetails = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { post, posts, status } = useSelector((state) => state.posts);
  useEffect(() => {
    dispatch(fetchPost(id));
  }, [dispatch, id]);
  const isLoading = status === "fetchPost.loading";
  return (
    <>
      <Paper
        style={{ marginTop: "10px", padding: "20px", borderRadius: "15px" }}
        elevation={6}
      >
        <div className={classes.card}>
          {/* Change content beside values */}
          {isLoading ? (
            <div className={classes.skeleton}>
              <Skeleton
                animation="wave"
                variant="text"
                width={"80%"}
                height={140}
              />
              <Skeleton variant="rectangular" width={"80%"} height={118} />
            </div>
          ) : (
            <div className={classes.section}>
              <Typography variant="h3" component="h2">
                {post?.title}
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                color="textSecondary"
                component="h2"
              >
                {post?.tags.map((tag) => (
                  <Link
                    to={`/tags/${tag}`}
                    style={{ textDecoration: "none", color: "#3f51b5" }}
                  >
                    {` #${tag} `}
                  </Link>
                ))}
              </Typography>
              <Typography gutterBottom variant="body1" component="p">
                {post?.message}
              </Typography>
              <Typography variant="h6">
                Created by:
                <Link
                  to={`/creators/${post?.name}`}
                  style={{ textDecoration: "none", color: "#3f51b5" }}
                >
                  {` ${post?.name}`}
                </Link>
              </Typography>
              <Typography variant="body1">
                {moment(post?.createdAt).fromNow()}
              </Typography>
              <Divider style={{ margin: "20px 0" }} />
              {/* <CommentSection post={post} /> */}
              <Divider style={{ margin: "20px 0" }} />
              <div className={classes.imageSection}>
                <img
                  className={classes.media}
                  src={
                    post?.selectedFile ||
                    "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
                  }
                  alt={post?.title}
                />
              </div>
            </div>
          )}
        </div>
      </Paper>
    </>
  );
};

export default PostDetails;
