import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/auth/auth.slice";
import postReducer from "../slice/post/post.slice";
import guestReducer from "../slice/user/guest.slice";
import userReducer from "../slice/user/user.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    guest: guestReducer,
    post: postReducer,
  },
});
