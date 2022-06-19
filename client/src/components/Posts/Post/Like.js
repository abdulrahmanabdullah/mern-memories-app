import React from "react";
import ThumUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
const Like = ({ post, user }) => {
  if (post?.likes?.length > 0) {
    return post?.likes.find(
      (like) => like === (user?.result?._id || user?.result?.googleId)
    ) ? (
      <>
        <ThumUpAltIcon fontSize="small" />
        &nbsp;
        {post.likes.length > 2
          ? `You and ${post?.likes.length - 1} others`
          : `${post?.likes.length} like${post?.likes.length > 1 ? "s" : ""}`}
      </>
    ) : (
      <>
        <ThumbUpAltOutlinedIcon fontSize="small" />
        &nbsp;{post?.likes.length} {post?.likes.length === 1 ? "Like" : "Likes"}
      </>
    );
  }
  return (
    <>
      <ThumbUpAltOutlinedIcon fontSize="small" />
      &nbsp;Like
    </>
  );
};
export default Like;
