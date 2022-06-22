import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Typography, TextField, Button } from "@mui/material";
import { useStyle } from "./style";
import { postComment } from "../../features/posts/postSlice";

const CommentSection = ({ post }) => {
  const classes = useStyle();
  //Compoent state
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post?.comments);
  const commentRef = useRef();
  //Get user from localstorage to pass id to backend.
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();

  //load comments when component mount and updated.
  React.useEffect(() => {
    setComments(post?.comments);
  }, [post]);
  //Callbacks func
  const handleComment = async () => {
    const { payload } = await dispatch(
      postComment({ name: user?.result?.name, comment, id: post._id })
    );
    commentRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
    setComments(payload.comments);
    setComment("");
  };
  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments?.map((e, i) => (
            <Typography
              key={i}
              gutterBottom
              variant="subtitle1"
              style={{ padding: "10px" }}
            >
              <strong>{e.split(":")[0]}</strong>
              :&nbsp;{e.split(":")[1]}
            </Typography>
          ))}
          <div ref={commentRef} />
        </div>
        <div />
      </div>
      {user?.result && (
        <div style={{ width: "80%", position: "relative", left: "5%" }}>
          <Typography gutterBottom variant="h6">
            {" "}
            Write a comment
          </Typography>
          <TextField
            style={{ justifyContent: "center" }}
            fullWidth
            rows={4}
            variant="outlined"
            label="comment"
            multiline
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <br />
          <Button
            style={{ marginTop: "10px" }}
            variant="contained"
            fullWidth
            color="primary"
            onClick={handleComment}
          >
            Comment
          </Button>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
