import mongoose from "mongoose";
import PostMessage from "../models/postSchem";

export const getPosts = async (req, res, next) => {
  try {
    const collection = await PostMessage.find();
    return res.status(200).json(collection);
  } catch (error) {
    console.log(error);
  }
};

export const getPostBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  console.log(searchQuery, tags);

  try {
    const title = new RegExp(searchQuery, "i");
    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });
    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: "Not found post" });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  try {
    const newPost = await PostMessage.create({
      ...post,
      creator: req.userId,
      createdAt: new Date().toISOString(),
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update post
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { creator, title, message, selectedFile, tags } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No post with this Id");
    const updateValues = {
      creator,
      title,
      message,
      selectedFile,
      tags,
      _id: id,
    };
    await PostMessage.findByIdAndUpdate(id, updateValues, { new: true });
    res.status(202).json(updateValues);
  } catch (error) {
    res.status(406).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`no post with this id:${id}`);
    await PostMessage.findByIdAndDelete(id);
    res.json({ message: "Post deleted", id });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
//Like post
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;

    //User id come from middleware.
    if (!req.userId) return res.json({ message: "Unauthenticated " });

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`no post with this id:${id}`);

    const post = await PostMessage.findById(id);

    //Like and remove like from post
    const index = post.likes.findIndex((id) => id === String(req.userId));
    if (index === -1) {
      // like post
      post.likes.push(req.userId);
    } else {
      //remove like from  post
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatePost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });

    return res.status(200).json(updatePost);
  } catch (error) {
    res.status(500).json(error);
  }
};
