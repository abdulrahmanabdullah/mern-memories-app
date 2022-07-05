import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { likePost } from "../../../features/posts/postSlice";
import { Button } from "@mui/material";
import ThumUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";

const Like = ({ post, user }) => {
  const [likes, setLikes] = useState(post?.likes);
  const userId = user?.result?._id || user?.result?.googleId;
  const hasLikedPost = post?.likes?.find((like) => like === userId);
  const dispatch = useDispatch();
  //Callback functions
  const handleLike = async () => {
    dispatch(likePost(post._id));
    if (hasLikedPost) {
      setLikes(post?.likes?.filter((id) => id !== userId));
    } else {
      setLikes([...post?.likes, userId]);
    }
  };
  return (
    <Button
      size="small"
      color="likeColor"
      onClick={handleLike}
      disabled={!userId}
    >
      {likes?.length > 0 ? (
        <>
          {likes?.find((l) => l === userId) ? (
            <>
              <ThumUpAltIcon fontSize="small" />
              &nbsp;
              {likes.length > 2
                ? `You and ${likes?.length - 1} others`
                : `${likes?.length} like${likes?.length > 1 ? "s" : ""}`}
            </>
          ) : (
            <>
              <ThumbUpAltOutlinedIcon fontSize="small" />
              &nbsp;{likes?.length} {likes?.length === 1 ? "Like" : "Likes"}
            </>
          )}
        </>
      ) : (
        <>
          <ThumbUpAltOutlinedIcon fontSize="small" />
          &nbsp;{likes?.length} {likes?.length === 1 ? "Like" : "Likes"}
        </>
      )}
    </Button>
  );
};
export default Like;
