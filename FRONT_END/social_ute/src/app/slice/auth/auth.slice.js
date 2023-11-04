import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    username: null,
    pwd: null,
    token: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { username, data, pwd } = action.payload;
      state.username = username;
      state.pwd = pwd;
      state.token = data.data.token;
    },
    logOut: (state, action) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.username;
export const selectCurrentToken = (state) => state.auth.token;
