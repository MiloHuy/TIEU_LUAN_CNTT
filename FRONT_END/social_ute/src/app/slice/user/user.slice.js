import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: null,
    first_name: null,
    last_name: null,
    avatar: null,
    role: null,
  },
  reducers: {
    setInfoUser: (state, action) => {
      const { user } = action.payload;

      console.log("User: " + user);

      state.userId = user._id;
      state.first_name = user.first_name;
      state.last_name = user.last_name;
      state.avatar = user.avatar;
      state.role = user.role_id;
    },
  },
});

export const { setInfoUser } = userSlice.actions;

export default userSlice.reducer;

export const selectUserInfo = (state) => state.user.userId;
export const selectUserAvatar = (state) => state.user.avatar;
