import Post from "../models/Post.js";
import User from "../models/userModel.js";

export const addPost = async (req, res) => {
  try {
    console.log("Authenticated user:", req.user);
    const post = new Post({
      user: req.user.id,
      content: req.body.content,
    });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    console.error("Error creating post:", error); 
    res.status(500).json({ error: "Error creating post" });
  }
};

export const toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    if (post.likes.includes(req.user.id)) {
      post.likes.pull(req.user.id);
    } else {
      post.likes.push(req.user.id);
    }

    await post.save();
    res.status(200).json({ message: "Like/dislike success" });
  } catch (error) {
    res.status(500).json({ error: "Error liking/disliking post" });
  }
};

export const addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    post.comments.push({
      user: req.user.id,
      comment: req.body.comment,
    });
    await post.save();
    res.status(200).json({ message: "Comment added" });
  } catch (error) {
    res.status(500).json({ error: "Error adding comment" });
  }
};

export const getFeed = async (req, res) => {
  try {
    // Find the current user and populate their following list
    const currentUser = await User.findById(req.user.id).populate("following");

    // Get the list of IDs: followers + current user
    const userIds = currentUser.following.map(followingUser => followingUser._id);
    userIds.push(req.user.id); // Include the current user's ID

    // Fetch posts by the current user or their followers
    const posts = await Post.find({ user: { $in: userIds } })
      .populate("user", "username") // Populate user details for each post
      .sort({ createdAt: -1 }); // Sort posts by most recent

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching feed:", error);
    res.status(500).json({ error: "Error fetching feed" });
  }
};
