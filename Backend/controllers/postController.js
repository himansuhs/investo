const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  const post = new Post({
    ...req.body,
    author: req.user._id,
    role: req.user.role,
  });
  await post.save();
  res.status(201).json(post);
};

exports.getPosts = async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
};

exports.updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post && post.author.toString() === req.user._id.toString()) {
    Object.assign(post, req.body);
    await post.save();
    res.json(post);
  } else {
    res.status(403).json({ message: "Access denied" });
  }
};

exports.deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post && post.author.toString() === req.user._id.toString()) {
    await post.deleteOne();
    res.json({ message: "Post deleted" });
  } else {
    res.status(403).json({ message: "Access denied" });
  }
};
