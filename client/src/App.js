import React, { useEffect, useState } from "react";
import { Container, Grow, Grid } from "@mui/material";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchPost } from "./features/posts/postSlice";
import { useStyle } from "./style";
import PostList from "./components/Posts/PostList";
import Form from "./components/Form/Form";
import Navbar from "./components/Navbar/Navbar";

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
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
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
    </BrowserRouter>
  );
};

export default App;
