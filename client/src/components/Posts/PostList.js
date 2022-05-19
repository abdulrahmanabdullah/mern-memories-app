import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  allPostSelector,
  postStatusSelector,
} from "../../features/posts/postSlice";

import { useStyle } from "./style";
import { Grid, CircularProgress } from "@mui/material";
import Post from "./Post/Post";

const PostList = ({ setPostId }) => {
  //Style
  const classes = useStyle();
  //get state from redux store
  const posts = useSelector(allPostSelector);
  const postStatus = useSelector(postStatusSelector);
  const postErrorMessage = useSelector((state) => state.posts.error);
  //Check request status before get data .
  let content;
  if (postStatus === "loading") {
    content = <CircularProgress />;
  } else if (postStatus === "successed") {
    content = posts.map((post) => (
      <Grid key={post._id} item xs={12} sm={6} md={6}>
        <Post post={post} />
      </Grid>
    ));
  } else {
    content = <h1>{postErrorMessage}</h1>;
  }
  return (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {content}
    </Grid>
  );
};

export default PostList;
