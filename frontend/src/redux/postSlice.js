// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   posts: {},
// };

// const postSlice = createSlice({
//   name: "post",
//   initialState,
//   reducers: {
//     getPosts(state, action) {
//       state.posts = action.payload;
//     },
//   },
// });

// export default postSlice.reducer;

// export function SetPosts(post) {
//   return (dispatch, getState) => {
//     dispatch(postSlice.actions.getPosts(post));
//   };
// }




import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload; // Expecting payload to be an array of posts
    },
  },
});

// Exporting the reducer as default
export default postSlice.reducer;

// Exporting the action creator
export const { setPosts } = postSlice.actions;

// Optional: You could also create a thunk for fetching posts
export const fetchPosts = () => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:4000/api/posts/feed"); // Adjust the URL as necessary
    const data = await response.json();
    dispatch(setPosts(data)); // Dispatch the posts data to the store
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    // Handle error as needed
  }
};
