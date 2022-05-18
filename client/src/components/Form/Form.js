import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Paper, Typography, TextField, Button } from "@mui/material";
import FileBase from "react-file-base64";
import { useStyle } from "./style";
import { addPost } from "../../features/posts/postSlice";

const Form = () => {
  //Styles
  const classes = useStyle();
  //component state
  const [postDate, setPostDate] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  //Dispatch
  const dispatch = useDispatch();
  //Handler functions
  const handlSubmit = (e) => {
    e.preventDefault();
    //dispatch to create post
    dispatch(addPost(postDate));
    console.log(postDate);
  };
  return (
    <Paper className={classes.paper}>
      <form
        onSubmit={handlSubmit}
        className={`${classes.root} ${classes.form}`}
      >
        {/* Form headers */}
        <Typography variant="h6">Create new Post</Typography>
        {/* form inputs  */}
        <TextField
          name="creator"
          label="creator"
          variant="outlined"
          value={postDate.creator || ""}
          onChange={(e) =>
            setPostDate({ ...postDate, creator: e.target.value })
          }
        />
        <TextField
          name="title"
          label="title"
          variant="outlined"
          value={postDate.title || ""}
          onChange={(e) => setPostDate({ ...postDate, title: e.target.value })}
        />
        <TextField
          name="message"
          label="message"
          variant="outlined"
          value={postDate.message || ""}
          onChange={(e) =>
            setPostDate({ ...postDate, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          label="tags"
          variant="outlined"
          value={postDate.tags}
          onChange={(e) => setPostDate({ ...postDate, tags: e.target.value })}
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostDate({ ...postDate, selectedFile: base64 })
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
          Submit
        </Button>
        {/* clear btn */}
        <Button size="samll" variant="contained" color="secondary" fullWidth>
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
