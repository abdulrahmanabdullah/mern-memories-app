import mongoose from "mongoose";
import PostMessage from "../models/postSchem";

export const getPosts = async (req, res) => {
  try {
    const collection = await PostMessage.find();
    res.status(200).json(collection);
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = async (req, res) => {
  const { creator, title, message, tags, selectedFile } = req.body;
  const newPost = new PostMessage({
    creator,
    title,
    message,
    tags,
    selectedFile,
  });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
