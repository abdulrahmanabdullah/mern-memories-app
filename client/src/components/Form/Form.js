import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Paper, Typography, TextField, Button } from "@mui/material";
import FileBase from "react-file-base64";
import { useStyle } from "./style";
import { addPost, updatePost } from "../../features/posts/postSlice";

//Todo: fix when call selector twice 🍀
const Form = ({ currentId, setCurrentId }) => {
  //Styles
  const classes = useStyle();
  //Get post from selector
  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((p) => p._id === currentId) : null
  );
  //component state
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  //Dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  //Handler functions
  const handlSubmit = (e) => {
    e.preventDefault();
    if (currentId === 0) {
      dispatch(addPost(postData));
    } else {
      //dispatch to create post
      dispatch(updatePost(postData));
    }
    clear();
  };

  //clear inputs
  const clear = () => {
    setCurrentId(0);
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };
  return (
    <Paper className={classes.paper}>
      <form
        onSubmit={handlSubmit}
        className={`${classes.root} ${classes.form}`}
      >
        {/* Form headers */}
        <Typography variant="h6">
          {currentId ? "Edit " : "Create new "}Post
        </Typography>
        {/* form inputs  */}
        <TextField
          name="creator"
          label="creator"
          variant="outlined"
          value={postData.creator || ""}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        />
        <TextField
          name="title"
          label="title"
          variant="outlined"
          value={postData.title || ""}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          label="message"
          variant="outlined"
          value={postData.message || ""}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          label="tags"
          variant="outlined"
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        {/* submit btn */}
        <Button
          size="large"
          type="submit"
          variant="contained"
          fullWidth
          style={{ marginBottom: "10px" }}
        >
          {currentId ? "Update" : "Submit"}
        </Button>
        {/* clear btn */}
        <Button
          onClick={() => clear()}
          size="samll"
          variant="contained"
          color="secondary"
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
