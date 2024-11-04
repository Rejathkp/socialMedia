// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import moment from "moment";
// import { NoProfile } from "../assets";
// import { BiComment, BiLike, BiSolidLike } from "react-icons/bi";
// import { MdOutlineDeleteOutline } from "react-icons/md";
// import { useForm } from "react-hook-form";
// import TextInput from "./TextInput";
// import Loading from "./Loading";
// import CustomButton from "./CustomButton";
// import { postComments } from "../assets/data";

// const ReplyCard = ({ reply, user, handleLike }) => {
//   return (
//     <div className='w-full py-3'>
//       <div className='flex gap-3 items-center mb-1'>
//         <Link to={"/profile/" + reply?.userId?._id}>
//           <img
//             src={reply?.userId?.profileUrl ?? NoProfile}
//             alt={reply?.userId?.firstName}
//             className='w-10 h-10 rounded-full object-cover'
//           />
//         </Link>

//         <div>
//           <Link to={"/profile/" + reply?.userId?._id}>
//             <p className='font-medium text-base text-ascent-1'>
//               {reply?.userId?.firstName} {reply?.userId?.lastName}
//             </p>
//           </Link>
//           <span className='text-ascent-2 text-sm'>
//             {moment(reply?.createdAt).fromNow()}
//           </span>
//         </div>
//       </div>

//       <div className='ml-12'>
//         <p className='text-ascent-2 '>{reply?.comment}</p>
//         <div className='mt-2 flex gap-6'>
//           <p
//             className='flex gap-2 items-center text-base text-ascent-2 cursor-pointer'
//             onClick={handleLike}
//           >
//             {reply?.likes?.includes(user?._id) ? (
//               <BiSolidLike size={20} color='blue' />
//             ) : (
//               <BiLike size={20} />
//             )}
//             {reply?.likes?.length} Likes
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// const CommentForm = ({ user, id, replyAt, getComments }) => {
//   const [loading, setLoading] = useState(false);
//   const [errMsg, setErrMsg] = useState("");
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm({
//     mode: "onChange",
//   });

//   const onSubmit = async (data) => {};

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className='w-full border-b border-[#66666645]'
//     >
//       <div className='w-full flex items-center gap-2 py-4'>
//         <img
//           src={user?.profileUrl ?? NoProfile}
//           alt='User Image'
//           className='w-10 h-10 rounded-full object-cover'
//         />

//         <TextInput
//           name='comment'
//           styles='w-full rounded-full py-3'
//           placeholder={replyAt ? `Reply @${replyAt}` : "Comment this post"}
//           register={register("comment", {
//             required: "Comment can not be empty",
//           })}
//           error={errors.comment ? errors.comment.message : ""}
//         />
//       </div>
//       {errMsg?.message && (
//         <span
//           role='alert'
//           className={`text-sm ${
//             errMsg?.status === "failed"
//               ? "text-[#f64949fe]"
//               : "text-[#2ba150fe]"
//           } mt-0.5`}
//         >
//           {errMsg?.message}
//         </span>
//       )}

//       <div className='flex items-end justify-end pb-2'>
//         {loading ? (
//           <Loading />
//         ) : (
//           <CustomButton
//             title='Submit'
//             type='submit'
//             containerStyles='bg-[#0444a4] text-white py-1 px-3 rounded-full font-semibold text-sm'
//           />
//         )}
//       </div>
//     </form>
//   );
// };

// const PostCard = ({ post, user, deletePost, likePost }) => {
//   const [showAll, setShowAll] = useState(0);
//   const [showReply, setShowReply] = useState(0);
//   const [comments, setComments] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [replyComments, setReplyComments] = useState(0);
//   const [showComments, setShowComments] = useState(0);

//   const getComments = async () => {
//     setReplyComments(0);

//     setComments(postComments);
//     setLoading(false);
//   };
//   const handleLike = async () => {};

//   return (
//     <div className='mb-2 bg-primary p-4 rounded-xl'>
//       <div className='flex gap-3 items-center mb-2'>
//         <Link to={"/profile/" + post?.userId?._id}>
//           <img
//             src={post?.userId?.profileUrl ?? NoProfile}
//             alt={post?.userId?.firstName}
//             className='w-14 h-14 object-cover rounded-full'
//           />
//         </Link>

//         <div className='w-full flex justify-between'>
//           <div className=''>
//             <Link to={"/profile/" + post?.userId?._id}>
//               <p className='font-medium text-lg text-ascent-1'>
//                 {post?.userId?.firstName} {post?.userId?.lastName}
//               </p>
//             </Link>
//             <span className='text-ascent-2'>{post?.userId?.location}</span>
//           </div>

//           <span className='text-ascent-2'>
//             {moment(post?.createdAt ?? "2023-05-25").fromNow()}
//           </span>
//         </div>
//       </div>

//       <div>
//         <p className='text-ascent-2'>
//           {showAll === post?._id
//             ? post?.description
//             : post?.description.slice(0, 300)}

//           {post?.description?.length > 301 &&
//             (showAll === post?._id ? (
//               <span
//                 className='text-blue ml-2 font-mediu cursor-pointer'
//                 onClick={() => setShowAll(0)}
//               >
//                 Show Less
//               </span>
//             ) : (
//               <span
//                 className='text-blue ml-2 font-medium cursor-pointer'
//                 onClick={() => setShowAll(post?._id)}
//               >
//                 Show More
//               </span>
//             ))}
//         </p>

//         {post?.image && (
//           <img
//             src={post?.image}
//             alt='post image'
//             className='w-full mt-2 rounded-lg'
//           />
//         )}
//       </div>

//       <div
//         className='mt-4 flex justify-between items-center px-3 py-2 text-ascent-2
//       text-base border-t border-[#66666645]'
//       >
//         <p className='flex gap-2 items-center text-base cursor-pointer'>
//           {post?.likes?.includes(user?._id) ? (
//             <BiSolidLike size={20} color='blue' />
//           ) : (
//             <BiLike size={20} />
//           )}
//           {post?.likes?.length} Likes
//         </p>

//         <p
//           className='flex gap-2 items-center text-base cursor-pointer'
//           onClick={() => {
//             setShowComments(showComments === post._id ? null : post._id);
//             getComments(post?._id);
//           }}
//         >
//           <BiComment size={20} />
//           {post?.comments?.length} Comments
//         </p>

//         {user?._id === post?.userId?._id && (
//           <div
//             className='flex gap-1 items-center text-base text-ascent-1 cursor-pointer'
//             onClick={() => deletePost(post?._id)}
//           >
//             <MdOutlineDeleteOutline size={20} />
//             <span>Delete</span>
//           </div>
//         )}
//       </div>

//       {/* COMMENTS */}
//       {showComments === post?._id && (
//         <div className='w-full mt-4 border-t border-[#66666645] pt-4 '>
//           <CommentForm
//             user={user}
//             id={post?._id}
//             getComments={() => getComments(post?._id)}
//           />

//           {loading ? (
//             <Loading />
//           ) : comments?.length > 0 ? (
//             comments?.map((comment) => (
//               <div className='w-full py-2' key={comment?._id}>
//                 <div className='flex gap-3 items-center mb-1'>
//                   <Link to={"/profile/" + comment?.userId?._id}>
//                     <img
//                       src={comment?.userId?.profileUrl ?? NoProfile}
//                       alt={comment?.userId?.firstName}
//                       className='w-10 h-10 rounded-full object-cover'
//                     />
//                   </Link>
//                   <div>
//                     <Link to={"/profile/" + comment?.userId?._id}>
//                       <p className='font-medium text-base text-ascent-1'>
//                         {comment?.userId?.firstName} {comment?.userId?.lastName}
//                       </p>
//                     </Link>
//                     <span className='text-ascent-2 text-sm'>
//                       {moment(comment?.createdAt ?? "2023-05-25").fromNow()}
//                     </span>
//                   </div>
//                 </div>

//                 <div className='ml-12'>
//                   <p className='text-ascent-2'>{comment?.comment}</p>

//                   <div className='mt-2 flex gap-6'>
//                     <p className='flex gap-2 items-center text-base text-ascent-2 cursor-pointer'>
//                       {comment?.likes?.includes(user?._id) ? (
//                         <BiSolidLike size={20} color='blue' />
//                       ) : (
//                         <BiLike size={20} />
//                       )}
//                       {comment?.likes?.length} Likes
//                     </p>
//                     <span
//                       className='text-blue cursor-pointer'
//                       onClick={() => setReplyComments(comment?._id)}
//                     >
//                       Reply
//                     </span>
//                   </div>

//                   {replyComments === comment?._id && (
//                     <CommentForm
//                       user={user}
//                       id={comment?._id}
//                       replyAt={comment?.from}
//                       getComments={() => getComments(post?._id)}
//                     />
//                   )}
//                 </div>

//                 {/* REPLIES */}

//                 <div className='py-2 px-8 mt-6'>
//                   {comment?.replies?.length > 0 && (
//                     <p
//                       className='text-base text-ascent-1 cursor-pointer'
//                       onClick={() =>
//                         setShowReply(
//                           showReply === comment?.replies?._id
//                             ? 0
//                             : comment?.replies?._id
//                         )
//                       }
//                     >
//                       Show Replies ({comment?.replies?.length})
//                     </p>
//                   )}

//                   {showReply === comment?.replies?._id &&
//                     comment?.replies?.map((reply) => (
//                       <ReplyCard
//                         reply={reply}
//                         user={user}
//                         key={reply?._id}
//                         handleLike={() =>
//                           handleLike(
//                             "/posts/like-comment/" +
//                               comment?._id +
//                               "/" +
//                               reply?._id
//                           )
//                         }
//                       />
//                     ))}
//                 </div>
//               </div>
//             ))
//           ) : (
//             <span className='flex text-sm py-4 text-ascent-2 text-center'>
//               No Comments, be first to comment
//             </span>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PostCard;


















import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";
import { NoProfile } from "../assets";
import { BiComment, BiLike, BiSolidLike } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useForm } from "react-hook-form";
import TextInput from "./TextInput";
import Loading from "./Loading";
import CustomButton from "./CustomButton";

// Helper function for fetching comments data
const fetchComments = async (postId) => {
  try {
    const response = await axios.get(`/api/posts/${postId}/comments`);
    return response.data.comments; // assuming response structure contains comments
  } catch (error) {
    console.error("Error fetching comments", error);
    return [];
  }
};

const ReplyCard = ({ reply, user, handleLike }) => (
  <div className="w-full py-3">
    {/* User details and reply text */}
  </div>
);

const CommentForm = ({ user, postId, replyAt, refreshComments }) => {
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      console.log("Submitting comment for postId:", postId);  // Log postId here
      setLoading(true);
      const response = await axios.post(
        `/api/posts/${postId}/comment`,
        { comment: data.comment },  // Adjust this if the comment field is named differently
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,  // Add token if required
          },
        }
      );
      if (response.status === 201) {
        refreshComments();  // Reload comments after a successful post
        reset();
      }
    } catch (error) {
      console.error("Error posting comment:", error);  // Log any errors here
      setErrMsg("Failed to post comment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full border-b border-[#66666645]">
      <div className="w-full flex items-center gap-2 py-4">
        {/* User image and input field */}
      </div>
      {errMsg && <span role="alert" className="text-sm text-[#f64949fe] mt-0.5">{errMsg}</span>}
      <div className="flex items-end justify-end pb-2">
        {loading ? <Loading /> : <CustomButton title="Submit" type="submit" containerStyles="bg-[#0444a4] text-white py-1 px-3 rounded-full font-semibold text-sm" />}
      </div>
    </form>
  );
};

const PostCard = ({ post, user, deletePost }) => {
  const [showAll, setShowAll] = useState(false);
  const [showReply, setShowReply] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [likes, setLikes] = useState(post?.likes || []);

  useEffect(() => {
    if (showComments) getComments(post._id);
  }, [showComments]);

  const getComments = async (postId) => {
    setLoading(true);
    const fetchedComments = await fetchComments(postId);
    setComments(fetchedComments);
    setLoading(false);
  };

  const handleLike = async () => {
    try {
      const token = localStorage.getItem("token");  
      const response = await axios.put(
        `http://localhost:4000/api/posts/${post._id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        setLikes((prevLikes) => {
          const isLiked = prevLikes.includes(user._id);
          const updatedLikes = isLiked
            ? prevLikes.filter((id) => id !== user._id)
            : [...prevLikes, user._id];
          
          console.log("Updated likes:", updatedLikes); // Debugging line
          return updatedLikes;
        });
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };
  

  return (
    <div className="mb-2 bg-primary p-4 rounded-xl">
      {/* Post details */}
      <div className="mt-4 px-3 py-2">
        <p className="text-base text-ascent-2">{post?.content}</p> {/* Display post content here */}
      </div>
      {/* Post content */}
      <div className="mt-4 flex justify-between items-center px-3 py-2 text-ascent-2 text-base border-t border-[#66666645]">
        <p className="flex gap-2 items-center text-base cursor-pointer" onClick={handleLike}>
          {likes.includes(user._id) ? <BiSolidLike size={20} color="blue" /> : <BiLike size={20} />}
          {likes.length} Likes
        </p>
        
        <p className="flex gap-2 items-center text-base cursor-pointer" onClick={() => setShowComments(!showComments)}>
          <BiComment size={20} />
          {post?.comments?.length || 0} Comments
        </p>
        
        {user?._id === post?.userId?._id && (
          <div className="flex gap-1 items-center text-base text-ascent-1 cursor-pointer" onClick={() => deletePost(post._id)}>
            <MdOutlineDeleteOutline size={20} />
            <span>Delete</span>
          </div>
        )}
      </div>

      {/* COMMENTS SECTION */}
      {showComments && (
        // <div className="w-full mt-4 border-t border-[#66666645] pt-4">
        //   <CommentForm user={user} postId={post._id} refreshComments={() => getComments(post._id)} />
        //   {loading ? <Loading /> : comments.length > 0 ? (
        //     comments.map((comment) => (
        //       <div className="w-full py-2" key={comment._id}>
        //         {/* Render comment */}
        //         <div className="ml-12">
        //           <p className="text-ascent-2">{comment.comment}</p>
        //           <div className="mt-2 flex gap-6">
        //             <p className="flex gap-2 items-center text-base text-ascent-2 cursor-pointer">
        //               {comment.likes.includes(user._id) ? <BiSolidLike size={20} color="blue" /> : <BiLike size={20} />}
        //               {comment.likes.length} Likes
        //             </p>
        //             <span className="text-blue cursor-pointer" onClick={() => setShowReply(showReply === comment._id ? null : comment._id)}>
        //               Reply
        //             </span>
        //           </div>
                  
        //           {/* Show reply form if `showReply` matches the comment ID */}
        //           {showReply === comment._id && <CommentForm user={user} postId={comment._id} replyAt={comment.userId} refreshComments={() => getComments(post._id)} />}
        //         </div>
        //       </div>
        //     ))
        //   ) : (
        //     <span className="flex text-sm py-4 text-ascent-2 text-center">No Comments, be first to comment</span>
        //   )}
        // </div>
        <div className="px-3 py-2 border-t border-[#66666645]">
          {post?.comments?.map((comment, idx) => (
            <p key={idx} className="text-sm text-ascent-2">
              {comment.text}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostCard;
