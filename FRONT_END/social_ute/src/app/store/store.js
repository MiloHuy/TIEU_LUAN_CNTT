import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/auth/auth.slice";
import postReducer from "../slice/post/post.slice";
import userReducer from "../slice/user/user.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    post: postReducer,
  },
});
