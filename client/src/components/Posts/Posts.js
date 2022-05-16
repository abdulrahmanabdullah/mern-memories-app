import React from "react";
import { useStyle } from "./style";
import { Grid } from "@mui/material";
import Post from "./Post/Post";

//TODO: CREATE POST component
//TODO: Call api to fetch posts.

const Posts = () => {
  const classes = useStyle();
  return (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      <Grid item xs={12} sm={6} md={6}>
        <Post />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <Post />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <Post />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <Post />
      </Grid>
    </Grid>
  );
};

export default Posts;
