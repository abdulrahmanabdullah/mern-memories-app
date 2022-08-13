import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Paper, Typography, TextField, Button } from "@mui/material";
import FileBase from "react-file-base64";
import { useStyle } from "./style";
import { addPost, updatePost } from "../../features/posts/postSlice";
import { useTranslation } from "react-i18next";

const Form = ({ currentId, setCurrentId }) => {
  const { t } = useTranslation();
  //Styles
  const classes = useStyle();
  const { isLogout, user } = useSelector((state) => state?.users);
  //Get post from selector
  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((p) => p._id === currentId) : null
  );

  //component state
  const [postData, setPostData] = useState({
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
  }, [post, isLogout]);

  //Handler functions
  const handlSubmit = (e) => {
    e.preventDefault();
    if (currentId === 0) {
      dispatch(addPost({ ...postData, name: user?.name }));
    } else {
      //dispatch to create post
      dispatch(updatePost({ ...postData, name: user?.name }));
    }
    clear();
  };

  //clear inputs
  const clear = () => {
    setCurrentId(0);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  //If user not login or register show this component
  if (isLogout) {
    return (
      <Paper className={classes.paper}>
        <Typography>{t("pleaseLogin")}.</Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper}>
      <form
        onSubmit={handlSubmit}
        className={`${classes.root} ${classes.form}`}
      >
        {/* Form headers */}
        <Typography variant="h6">
          {currentId ? t("edit") : t("createPost")}
        </Typography>
        {/* form inputs  */}
        <TextField
          required
          name="title"
          label={t("title")}
          variant="outlined"
          value={postData.title || ""}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          required
          name="message"
          label={t("message")}
          variant="outlined"
          value={postData.message || ""}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          required
          name="tags"
          label={t("tags")}
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
          color="custom"
          fullWidth
          style={{ marginBottom: "10px" }}
        >
          {currentId ? t("update") : t("submit")}
        </Button>
        {/* clear btn */}
        <Button
          style={{ backgroundColor: "#9c6db0cf", text: "#fff" }}
          onClick={() => clear()}
          size="samll"
          variant="contained"
          fullWidth
        >
          {t("clear")}
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
