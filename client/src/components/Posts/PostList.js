import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { allPostSelector, fetchPost } from "../../features/posts/postSlice";

import { useStyle } from "./style";
import { Grid, CircularProgress } from "@mui/material";
import Post from "./Post/Post";

const PostList = () => {
  //Style
  const classes = useStyle();
  const dispatch = useDispatch();
  //get state from redux store
  const posts = useSelector(allPostSelector);
  const postStatus = useSelector((state) => state.posts.status);
  const postErrorMessage = useSelector((state) => state.posts.error);
  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPost());
    }
  }, [postStatus, dispatch]);
  //Check request status before get data .
  let content;
  if (postStatus === "loading") {
    content = <CircularProgress />;
  } else if (postStatus === "success") {
    content = posts.map((post) => (
      <Grid key={post.id} item xs={12} sm={6} md={6}>
        <Post />
      </Grid>
    ));
  } else {
    content = <h1>{postErrorMessage}</h1>;
  }
  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post.id} item xs={12} sm={6} md={6}>
          <Post post={post} />
        </Grid>
      ))}
    </Grid>
  );
};

export default PostList;
