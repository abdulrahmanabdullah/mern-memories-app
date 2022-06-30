import React from "react";
import { useSelector } from "react-redux";
import { useStyle } from "./style";
import { Grid, CircularProgress } from "@mui/material";
import Post from "./Post/Post";

const PostList = ({ setCurrentId }) => {
  //Style
  const classes = useStyle();
  //get state from redux store
  const { posts, status, message } = useSelector((state) => state.posts);
  // Here I'm using switch to avoiding duplicate Component wherease search component it's simaler PostList component.
  switch (status) {
    case "fetchPosts.loading":
    case "searchPost.loading":
    case "fetchPosts.failed":
      return <CircularProgress />;
    case "fetchPosts.successed":
    case "searchPost.successed":
      return (
        <Grid
          className={classes.container}
          container
          alignItems="stretch"
          spacing={3}
        >
          {posts?.map((post) => (
            <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
              <Post post={post} setCurrentId={setCurrentId} />
            </Grid>
          ))}
        </Grid>
      );
    default:
      return <h1>{message}</h1>;
  }
};
export default React.memo(PostList);
