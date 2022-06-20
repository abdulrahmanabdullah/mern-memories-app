import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost, postBySearch } from "../../features/posts/postSlice";
import {
  Paper,
  Skeleton,
  Typography,
  Divider,
  ImageList,
  ImageListItem,
  ListSubheader,
  ImageListItemBar,
  IconButton,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import moment from "moment";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useStyle } from "./style";

const PostDetails = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { post, posts, status } = useSelector((state) => state.posts);

  //This fetch post by id
  useEffect(() => {
    dispatch(fetchPost(id));
  }, [dispatch, id]);

  //Search by tags
  // useEffect(() => {
  //   if (post) {
  //     dispatch(postBySearch(post.tags.join(",")));
  //   }
  // }, [post]);

  //This for skelton loading.
  const isLoading = status === "fetchPost.loading";

  //Recommended Posts
  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  //callbacks functions
  const openPost = (id) => navigate(`/post/${id}`);

  return (
    <>
      <Paper
        style={{ marginTop: "10px", padding: "20px", borderRadius: "15px" }}
        elevation={6}
      >
        <div className={classes.card}>
          {/* Change content beside values */}
          {isLoading ? (
            <div className={classes.skeleton}>
              <Skeleton
                animation="wave"
                variant="text"
                width={"80%"}
                height={140}
              />
              <Skeleton variant="rectangular" width={"80%"} height={118} />
            </div>
          ) : (
            // Card Details when post loaded .
            <>
              <div className={classes.section}>
                {/* Title */}
                <Typography variant="h3" component="h2">
                  {post?.title}
                </Typography>
                {/* Tags */}
                <Typography
                  gutterBottom
                  variant="h6"
                  color="textSecondary"
                  component="h2"
                >
                  {post?.tags.map((tag) => (
                    <Link
                      to={`/post/serach?searchQuery=none&tags=${tag}`}
                      style={{ textDecoration: "none", color: "#3f51b5" }}
                    >
                      {` #${tag} `}
                    </Link>
                  ))}
                </Typography>
                {/* Message */}
                <Typography gutterBottom variant="body1" component="p">
                  {post?.message}
                </Typography>
                {/* Creator */}
                <Typography variant="h6">
                  Created by:
                  <Link
                    to={`/creators/${post?.name}`}
                    style={{ textDecoration: "none", color: "#3f51b5" }}
                  >
                    {` ${post?.name}`}
                  </Link>
                </Typography>
                {/* Date and time */}
                <Typography variant="body1">
                  {moment(post?.createdAt).fromNow()}
                </Typography>
                <Divider style={{ margin: "20px 0" }} />
                {/* <CommentSection post={post} /> */}
                <Divider style={{ margin: "20px 0" }} />
                {/* End section tag */}
              </div>
              {/* Image */}
              <div className={classes.imageSection}>
                <img
                  className={classes.media}
                  style={{ objectFit: "contain" }}
                  src={
                    post?.selectedFile ||
                    "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
                  }
                  alt={post?.title}
                />
                {/*  End image tag */}
              </div>
            </>
          )}
        </div>
        {/* Similar Post, you might like this post */}
        {recommendedPosts?.length && (
          <ImageList sx={{ width: "100%", height: "auto" }}>
            <ImageListItem key="Subheader" cols={2}>
              <ListSubheader component="div">
                You might also likes:
              </ListSubheader>
            </ImageListItem>
            {recommendedPosts.map((item) => (
              <ImageListItem key={item._id}>
                <img
                  style={{ objectFit: "contain", height: "250px" }}
                  src={item.selectedFile}
                  srcSet={item.selectedFile}
                  alt={item.title}
                  loading="lazy"
                />
                <ImageListItemBar
                  title={item.title}
                  subtitle={item.name}
                  actionIcon={
                    <IconButton
                      sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                      aria-label={`info about ${item.title}`}
                      onClick={() => openPost(item._id)}
                    >
                      <InfoIcon />
                    </IconButton>
                  }
                />
              </ImageListItem>
            ))}
          </ImageList>
        )}
      </Paper>
    </>
  );
};

export default PostDetails;