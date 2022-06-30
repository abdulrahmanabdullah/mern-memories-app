import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postBySearch } from "../../features/posts/postSlice";
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
import { useTranslation } from "react-i18next";
//React hooks
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Home = () => {
  const { t } = useTranslation();
  //Component style
  const classes = useStyle();
  // state component to pass it as a props to Form and PostList.
  const [currentId, setCurrentId] = useState(0);
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get("page");

  //dispatch to get all posts
  const dispatch = useDispatch();

  //Callback functions
  const handleAdd = (tag) => setTags([...tags, tag]);
  const handleDelete = (tag) => setTags(tags.filter((t) => t !== tag));
  const handleSearch = () => {
    if (search.trim() !== "" || tags.length > 0) {
      //dispatch search
      dispatch(postBySearch({ search, tags: tags.join(",") }));
      navigate(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
      setSearch("");
      setTags([]);
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
                  label={t("search query")}
                  value={search}
                  onKeyPress={handleKeyPress}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <ChipInput
                  style={{ margin: "10px 0" }}
                  value={tags}
                  onAdd={handleAdd}
                  onDelete={handleDelete}
                  label={t("searchTag")}
                  variant="outlined"
                />
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  onClick={handleSearch}
                >
                  {t("search")}
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
