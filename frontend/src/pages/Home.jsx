
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  CustomButton,
  EditProfile,
  FriendsCard,
  Loading,
  PostCard,
  ProfileCard,
  TextInput,
  TopBar,
} from "../components";
import { Link } from "react-router-dom";
import { NoProfile } from "../assets";
import { BsFiletypeGif, BsPersonFillAdd } from "react-icons/bs";
import { BiImages, BiSolidVideo } from "react-icons/bi";
import { useForm } from "react-hook-form";
import axios from "axios"; // Import axios for making HTTP requests

const Home = () => {
  const { user, edit } = useSelector((state) => state.user);
  const [friendRequest, setFriendRequest] = useState([]); // Adjust according to your data source
  const [suggestedFriends, setSuggestedFriends] = useState([]); // Adjust according to your data source
  const [posts, setPosts] = useState([]); // Posts state
  const [errMsg, setErrMsg] = useState("");
  const [file, setFile] = useState(null);
  const [posting, setPosting] = useState(false);
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, formState: { errors } } = useForm();
  // const backendUrl = process.env.REACT_APP_BACKEND_URL; // Use environment variable for backend URL

  // Fetch posts and other data on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming the token is stored in local storage
        const response = await axios.get(`http://localhost:4000/api/posts/feed`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Fetched posts:", response.data); // Log the response data

        setPosts(response.data); // Set posts from the database
      } catch (error) {
        console.error("Error fetching posts:", error);
        setErrMsg("Failed to fetch posts. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, ['http://localhost:4000/api']);

  const handlePostSubmit = async (data) => {
    setPosting(true);
    setErrMsg(""); // Clear previous error messages

    try {
      const formData = new FormData();
      formData.append("content", data.description);
      if (file) {
        formData.append("file", file); // Append file if it exists
      }

      const token = localStorage.getItem("token");
      const response = await axios.post(`http://localhost:4000/api/posts`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setPosts((prevPosts) => [response.data, ...prevPosts]); // Update local posts state
    } catch (error) {
      console.error("Error creating post:", error);
      setErrMsg("Failed to create post. Please try again.");
    } finally {
      setPosting(false);
    }
  };

  return (
    <>
      <div className='w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden'>
        <TopBar />

        <div className='w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full'>
          {/* LEFT */}
          <div className='hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-y-auto'>
            <ProfileCard user={user} />
            <FriendsCard friends={user?.friends} />
          </div>

          {/* CENTER */}
          <div className='flex-1 h-full px-4 flex flex-col gap-6 overflow-y-auto rounded-lg'>
            <form onSubmit={handleSubmit(handlePostSubmit)} className='bg-primary px-4 rounded-lg'>
              <div className='w-full flex items-center gap-2 py-4 border-b border-[#66666645]'>
                <img
                  src={user?.profileUrl ?? NoProfile}
                  alt='User Image'
                  className='w-14 h-14 rounded-full object-cover'
                />
                <TextInput
                  styles='w-full rounded-full py-5'
                  placeholder="What's on your mind...."
                  name='description'
                  register={register("description", {
                    required: "Write something about post",
                  })}
                  error={errors.description ? errors.description.message : ""}
                />
              </div>
              {errMsg && (
                <span role='alert' className="text-sm text-[#f64949fe] mt-0.5">
                  {errMsg}
                </span>
              )}

              <div className='flex items-center justify-between py-4'>
                <label
                  htmlFor='imgUpload'
                  className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer'
                >
                  <input
                    type='file'
                    onChange={(e) => setFile(e.target.files[0])}
                    className='hidden'
                    id='imgUpload'
                    accept='.jpg, .png, .jpeg'
                  />
                  <BiImages />
                  <span>Image</span>
                </label>

                <label
                  className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer'
                  htmlFor='videoUpload'
                >
                  <input
                    type='file'
                    onChange={(e) => setFile(e.target.files[0])}
                    className='hidden'
                    id='videoUpload'
                    accept='.mp4, .wav'
                  />
                  <BiSolidVideo />
                  <span>Video</span>
                </label>

                <label
                  className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer'
                  htmlFor='vgifUpload'
                >
                  <input
                    type='file'
                    onChange={(e) => setFile(e.target.files[0])}
                    className='hidden'
                    id='vgifUpload'
                    accept='.gif'
                  />
                  <BsFiletypeGif />
                  <span>Gif</span>
                </label>

                <div>
                  {posting ? (
                    <Loading />
                  ) : (
                    <CustomButton
                      type='submit'
                      title='Post'
                      containerStyles='bg-[#0444a4] text-white py-1 px-6 rounded-full font-semibold text-sm'
                    />
                  )}
                </div>
              </div>
            </form>

            {loading ? (
              <Loading />
            ) : posts.length > 0 ? (
              posts.map((post) => (
                <PostCard
                  key={post?._id}
                  post={post}
                  user={user}
                  deletePost={() => {}}
                  likePost={() => {}}
                />
              ))
            ) : (
              <div className='flex w-full h-full items-center justify-center'>
                <p className='text-lg text-ascent-2'>No Post Available</p>
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className='hidden w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto'>
            {/* FRIEND REQUEST */}
            <div className='w-full bg-primary shadow-sm rounded-lg px-6 py-5'>
              <div className='flex items-center justify-between text-xl text-ascent-1 pb-2 border-b border-[#66666645]'>
                <span> Friend Request</span>
                <span>{friendRequest.length}</span>
              </div>

              <div className='w-full flex flex-col gap-4 pt-4'>
                {friendRequest.map(({ _id, requestFrom: from }) => (
                  <div key={_id} className='flex items-center justify-between'>
                    <Link to={"/profile/" + from._id} className='w-full flex gap-4 items-center cursor-pointer'>
                      <img
                        src={from?.profileUrl ?? NoProfile}
                        alt={from?.firstName}
                        className='w-10 h-10 object-cover rounded-full'
                      />
                      <div className='flex-1'>
                        <p className='text-base font-medium text-ascent-1'>
                          {from?.firstName} {from?.lastName}
                        </p>
                        <span className='text-sm text-ascent-2'>
                          {from?.profession ?? "No Profession"}
                        </span>
                      </div>
                    </Link>
                    <BsPersonFillAdd className='text-2xl text-[#0444a4] cursor-pointer' />
                  </div>
                ))}
              </div>
            </div>

            {/* SUGGESTED FRIENDS */}
            <div className='w-full bg-primary shadow-sm rounded-lg px-6 py-5'>
              <div className='flex items-center justify-between text-xl text-ascent-1 pb-2 border-b border-[#66666645]'>
                <span>Suggested Friends</span>
                <span>{suggestedFriends.length}</span>
              </div>

              <div className='w-full flex flex-col gap-4 pt-4'>
                {suggestedFriends.map((friend) => (
                  <Link to={"/profile/" + friend._id} key={friend._id} className='flex items-center gap-4 cursor-pointer'>
                    <img
                      src={friend?.profileUrl ?? NoProfile}
                      alt={friend?.firstName}
                      className='w-10 h-10 object-cover rounded-full'
                    />
                    <div>
                      <p className='text-base font-medium text-ascent-1'>
                        {friend?.firstName} {friend?.lastName}
                      </p>
                      <span className='text-sm text-ascent-2'>{friend?.profession ?? "No Profession"}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {edit && <EditProfile />}
    </>
  );
};

export default Home;










// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import {
//   CustomButton,
//   EditProfile,
//   FriendsCard,
//   Loading,
//   PostCard,
//   ProfileCard,
//   TextInput,
//   TopBar,
// } from "../components";
// import { Link } from "react-router-dom";
// import { NoProfile } from "../assets";
// import { BsFiletypeGif, BsPersonFillAdd } from "react-icons/bs";
// import { BiImages, BiSolidVideo } from "react-icons/bi";
// import { useForm } from "react-hook-form";
// import axios from "axios";

// const Home = () => {
//   const { user, edit } = useSelector((state) => state.user);
//   const [posts, setPosts] = useState([]); // Holds the list of posts
//   const [errMsg, setErrMsg] = useState("");
//   const [file, setFile] = useState(null);
//   const [posting, setPosting] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const { register, handleSubmit, formState: { errors } } = useForm();

//   // Fetch posts when component mounts
//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const token = localStorage.getItem("token"); // Get token for authorization
//         const response = await axios.get(`http://localhost:4000/api/posts/feed`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setPosts(response.data); // Set posts to state
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//         setErrMsg("Failed to fetch posts. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPosts();
//   }, []);

//   // Handle post submission
//   const handlePostSubmit = async (data) => {
//     setPosting(true);
//     setErrMsg(""); // Reset error message

//     try {
//       const formData = new FormData();
//       formData.append("content", data.description);
//       if (file) formData.append("file", file); // Add file if any

//       const token = localStorage.getItem("token");
//       const response = await axios.post(`http://localhost:4000/api/posts`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       setPosts((prevPosts) => [response.data, ...prevPosts]); // Add new post to posts state
//     } catch (error) {
//       console.error("Error creating post:", error);
//       setErrMsg("Failed to create post. Please try again.");
//     } finally {
//       setPosting(false);
//     }
//   };

//   return (
//     <>
//       <div className="w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden">
//         <TopBar />

//         <div className="w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full">
//           {/* LEFT PANEL */}
//           <div className="hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-y-auto">
//             <ProfileCard user={user} />
//             <FriendsCard friends={user?.friends} />
//           </div>

//           {/* MAIN FEED */}
//           <div className="flex-1 h-full px-4 flex flex-col gap-6 overflow-y-auto rounded-lg">
//             {/* Post Input Form */}
//             <form onSubmit={handleSubmit(handlePostSubmit)} className="bg-primary px-4 rounded-lg">
//               <div className="w-full flex items-center gap-2 py-4 border-b border-[#66666645]">
//                 <img
//                   src={user?.profileUrl ?? NoProfile}
//                   alt="User Image"
//                   className="w-14 h-14 rounded-full object-cover"
//                 />
//                 <TextInput
//                   styles="w-full rounded-full py-5"
//                   placeholder="What's on your mind...."
//                   name="description"
//                   register={register("description", {
//                     required: "Write something about post",
//                   })}
//                   error={errors.description ? errors.description.message : ""}
//                 />
//               </div>

//               {errMsg && (
//                 <span role="alert" className="text-sm text-[#f64949fe] mt-0.5">
//                   {errMsg}
//                 </span>
//               )}

//               {/* Media Options and Submit Button */}
//               <div className="flex items-center justify-between py-4">
//                 <label htmlFor="imgUpload" className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer">
//                   <input type="file" onChange={(e) => setFile(e.target.files[0])} className="hidden" id="imgUpload" accept=".jpg, .png, .jpeg" />
//                   <BiImages /> <span>Image</span>
//                 </label>

//                 <label htmlFor="videoUpload" className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer">
//                   <input type="file" onChange={(e) => setFile(e.target.files[0])} className="hidden" id="videoUpload" accept=".mp4, .wav" />
//                   <BiSolidVideo /> <span>Video</span>
//                 </label>

//                 <label htmlFor="vgifUpload" className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer">
//                   <input type="file" onChange={(e) => setFile(e.target.files[0])} className="hidden" id="vgifUpload" accept=".gif" />
//                   <BsFiletypeGif /> <span>Gif</span>
//                 </label>

//                 <div>
//                   {posting ? <Loading /> : (
//                     <CustomButton
//                       type="submit"
//                       title="Post"
//                       containerStyles="bg-[#0444a4] text-white py-1 px-6 rounded-full font-semibold text-sm"
//                     />
//                   )}
//                 </div>
//               </div>
//             </form>

//             {/* Displaying Posts */}
//             {loading ? (
//               <Loading />
//             ) : posts.length > 0 ? (
//               posts.map((post) => (
//                 <PostCard
//                   key={post?._id}
//                   post={post}
//                   user={user}
//                   deletePost={() => {}}
//                   likePost={() => {}}
//                 />
//               ))
//             ) : (
//               <div className="flex w-full h-full items-center justify-center">
//                 <p className="text-lg text-ascent-2">No Post Available</p>
//               </div>
//             )}
//           </div>

//           {/* RIGHT PANEL */}
//           <div className="hidden w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto">
//             {/* Additional components like Friend Requests or Suggested Friends can be added here */}
//           </div>
//         </div>
//       </div>

//       {edit && <EditProfile />}
//     </>
//   );
// };

// export default Home;
