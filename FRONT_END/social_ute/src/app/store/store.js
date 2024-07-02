import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/auth/auth.slice";
import groupReducer from "../slice/group/group.slice";
import postReducer from "../slice/post/post.slice";
import guestReducer from "../slice/user/guest.slice";
import userReducer from "../slice/user/user.slice";
import socketReducer from "../slice/socket/socket.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    guest: guestReducer,
    post: postReducer,
    group: groupReducer,
    socket: socketReducer,
  },
});
