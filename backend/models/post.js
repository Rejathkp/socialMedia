import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      content: { type: String, required: true },
      likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      comments: [
        {
          user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          comment: { type: String, required: true },
        },
      ],
    },
    { timestamps: true }
  );
  
  const Post = mongoose.model("Post", postSchema);
  export default Post;
  