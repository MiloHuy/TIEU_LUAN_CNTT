import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: null,
    first_name: null,
    last_name: null,
  },
  reducers: {
    setInfoUser: (state, action) => {
      const { user } = action.payload;

      console.log("user: " + user);

      state.userId = user._id;
      state.first_name = user.first_name;
      state.last_name = user.last_name;
    },
  },
});

export const { setInfoUser } = userSlice.actions;

export default userSlice.reducer;

export const selectUserInfo = (state) => state.user.userId;
