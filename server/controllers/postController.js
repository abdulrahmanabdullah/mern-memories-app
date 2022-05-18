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
    res.status(201).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
