import React, { useEffect, useState } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { fetchPost } from "./features/posts/postSlice";
import { useStyle } from "./style";
import PostList from "./components/Posts/PostList";
import Form from "./components/Form/Form";

const App = () => {
  //component styles
  const classes = useStyle();
  // state component to pass it as a props to Form and PostList.
  const [currentId, setCurrentId] = useState(0);
  //dispatch to get all posts
  const dispatch = useDispatch();
  // When component mount get posts OR when posts change.
  useEffect(() => {
    dispatch(fetchPost());
  }, [currentId, dispatch]);

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        {/* website title and logo */}
        <Typography variant="h2" className={classes.heading}>
          {" "}
          Social media app{" "}
        </Typography>
        <img src="" alt="logo" className={classes.image} height="60" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            justifyContent="space-between"
            spacing={3}
            alignItems="stretch"
          >
            <Grid item xs={12} sm={7}>
              <PostList setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
