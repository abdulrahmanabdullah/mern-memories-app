import React, { useEffect, useState } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { postStatusSelector } from "./features/posts/postSlice";
import { fetchPost } from "./features/posts/postSlice";
import { useStyle } from "./style";
import PostList from "./components/Posts/PostList";
import Form from "./components/Form/Form";

const theme = createTheme();

const App = () => {
  //component styles
  const classes = useStyle();
  //component state
  const [postId, setPostId] = useState(0);
  const dispatch = useDispatch();
  //selector
  const postStatus = useSelector(postStatusSelector);
  //when component mount fetch all posts.
  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPost());
    }
  }, [postStatus, postId, dispatch]);

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
            <ThemeProvider theme={theme}>
              <Grid item xs={12} sm={7}>
                <PostList />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Form />
              </Grid>
            </ThemeProvider>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
