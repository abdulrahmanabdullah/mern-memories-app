import React from "react";
import { useSelector } from "react-redux";
import { useStyle } from "./style";
import { Grid, CircularProgress, Typography, Container } from "@mui/material";
import Post from "./Post/Post";
import { useLocation, Link } from "react-router-dom";

//React hooks
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const PostList = ({ setCurrentId }) => {
  //Style
  const classes = useStyle();
  //get state from redux store
  const { posts, status, message } = useSelector((state) => state.posts);
  //query
  const query = useQuery();
  const searchWord = query.get("searchQuery");
  const tags = query.get("tags");
  //subComponent to list all posts.
  const Posts = () => (
    <>
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
    </>
  );
  //Here my logic depend of Redux status. Show features/posts/postSlice.js
  if (status === "loading") {
    return <CircularProgress />;
  } else if (status === "successed") {
    return <Posts />;
  } else {
    return (
      <Container>
        <Typography fontSize="large">
          {message}of {searchWord === "none" ? tags : searchWord}
        </Typography>
        <Link to="/">back </Link>
      </Container>
    );
  }
};
export default React.memo(PostList);
