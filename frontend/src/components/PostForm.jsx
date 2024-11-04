import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import CustomButton from "./CustomButton";
import Loading from "./Loading";

const PostForm = ({ onPostCreated }) => {
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token"); // Get the auth token

      // Make the POST request to add a new post
      const response = await axios.post(
        "http://localhost:4000/api/posts",
        { content: data.content },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        // Call onPostCreated to refresh the posts list or add to the current list
        onPostCreated(response.data);
        reset(); // Clear the form
      }
    } catch (error) {
      console.error("Error creating post:", error);
      setErrMsg("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-4 p-4 border rounded">
      <textarea
        {...register("content", { required: "Content is required" })}
        placeholder="Write your post here..."
        className="w-full p-2 border rounded"
      />
      {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
      {errMsg && <p className="text-red-500 text-sm">{errMsg}</p>}
      <div className="flex justify-end mt-2">
        {loading ? (
          <Loading />
        ) : (
          <CustomButton title="Post" type="submit" containerStyles="bg-blue-600 text-white py-1 px-3 rounded" />
        )}
      </div>
    </form>
  );
};

export default PostForm;
