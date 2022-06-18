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

  if (status === "loading") return <CircularProgress />;
  else if (status === "successed")
    return (
      <Grid
        className={classes.container}
        container
        alignItems="stretch"
        spacing={3}
      >
        {posts?.map((post) => (
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    );
  else return <h1>{message}</h1>;
};

export default PostList;
