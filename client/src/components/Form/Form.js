import React from "react";
import { Paper, Typography, TextField, Button } from "@mui/material";
import FileBase from "react-file-base64";
import { useStyle } from "./style";

// TODO: create handler functions.
const Form = () => {
  const classes = useStyle();
  return (
    <Paper className={classes.paper}>
      <form className={`${classes.root} ${classes.form}`}>
        {/* Form headers */}
        <Typography variant="h6">Create new Post</Typography>
        {/* form inputs  */}
        <TextField name="creator" label="creator" variant="outlined" value="" />
        <TextField name="title" label="title" variant="outlined" value="" />
        <TextField name="message" label="message" variant="outlined" value="" />
        <TextField name="tags" label="tags" variant="outlined" value="" />
        <div className={classes.fileInput}>
          <FileBase type="file" multiple={false} onDone={() => {}} />
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
