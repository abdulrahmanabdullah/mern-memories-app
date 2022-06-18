import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPost,
  postStatusSelector,
  postBySearch,
} from "../../features/posts/postSlice";
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@mui/material";
import ChipInput from "material-ui-chip-input";
import { useNavigate, useLocation } from "react-router-dom";
import Pagination from "../Pagination";
import PostList from "../Posts/PostList";
import Form from "../Form/Form";
import { useStyle } from "./style";

//React hooks
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Home = () => {
  //Component style
  const classes = useStyle();
  // state component to pass it as a props to Form and PostList.
  const [currentId, setCurrentId] = useState(0);
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const postStatus = useSelector(postStatusSelector);
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get("page");
  const searchQuery = query.get("searchQuery");

  //dispatch to get all posts
  const dispatch = useDispatch();
  // When component mount get posts OR when posts change.
  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPost());
    }
  }, [postStatus, dispatch]);

  //Callback functions
  const handleAdd = (tag) => setTags([...tags, tag]);
  const handleDelete = (tag) => setTags(tags.filter((t) => t !== tag));
  const handleSearch = () => {
    if (search.trim() || tags) {
      //dispatch search
      dispatch(postBySearch({ search, tags: tags.join(",") }));
      navigate(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      navigate("/");
    }
  };

  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      // When user press enter
      handleSearch();
    }
  };

  return (
    <>
      <Grow in>
        <Container className={classes.gridContainer} maxWidth="xl">
          <Grid
            container
            justifyContent="space-between"
            spacing={3}
            alignItems="stretch"
          >
            <Grid item xs={12} sm={6} md={9}>
              <PostList setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              {/* Search area */}
              <AppBar
                className={classes.appBarSearch}
                position="static"
                color="inherit"
              >
                <TextField
                  fullWidth
                  name="search"
                  variant="outlined"
                  label="Search query"
                  value={search}
                  onKeyPress={handleKeyPress}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <ChipInput
                  style={{ margin: "10px 0" }}
                  value={tags}
                  onAdd={handleAdd}
                  onDelete={handleDelete}
                  label="Search Tags"
                  variant="outlined"
                />
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  onClick={handleSearch}
                >
                  Search
                </Button>
              </AppBar>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
              <Paper elevation={6} className={classes.pagination}>
                <Pagination page={page} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </>
  );
};

export default Home;
