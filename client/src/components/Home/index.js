import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchPost } from "../../features/posts/postSlice";

import { Container, Grow, Grid } from "@mui/material";

import PostList from "../Posts/PostList";
import Form from "../Form/Form";
const Home = () => {
  // state component to pass it as a props to Form and PostList.
  const [currentId, setCurrentId] = useState(0);
  //dispatch to get all posts
  const dispatch = useDispatch();
  // When component mount get posts OR when posts change.
  useEffect(() => {
    dispatch(fetchPost());
  }, [currentId, dispatch]);
  return (
    <>
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
    </>
  );
};

export default Home;