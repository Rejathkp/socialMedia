import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Start with null, will be set after login
  edit: false,
  loading: false, // Add loading state if needed
  error: null, // Add error state if needed
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRequest(state) {
      state.loading = true; // Set loading true when a login request is made
      state.error = null; // Reset error
    },
    loginSuccess(state, action) {
      state.user = action.payload; // Set user data from payload
      state.loading = false; // Reset loading state
    },
    loginFailure(state, action) {
      state.loading = false; // Reset loading state
      state.error = action.payload; // Set error from payload
    },
    logout(state) {
      state.user = null; // Reset user data
      localStorage.removeItem("user"); // Clean up local storage
    },
    updateProfile(state, action) {
      state.edit = action.payload; // Handle profile editing state
    },
  },
});

export default userSlice.reducer;

// Action creators
export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  updateProfile,
} = userSlice.actions;

export function UserLogin(user) {
  return async (dispatch) => {
    dispatch(loginRequest()); // Dispatch login request action

    try {
      // Assume the user data comes from the login API response
      dispatch(loginSuccess(user)); // Dispatch success action with user data
      localStorage.setItem("user", JSON.stringify(user)); // Store user in local storage
    } catch (error) {
      dispatch(loginFailure(error.response?.data?.message || "Login failed.")); // Handle error
    }
  };
}

export function Logout() {
  return (dispatch) => {
    dispatch(logout());
  };
}

export function UpdateProfile(val) {
  return (dispatch) => {
    dispatch(updateProfile(val));
  };
}
