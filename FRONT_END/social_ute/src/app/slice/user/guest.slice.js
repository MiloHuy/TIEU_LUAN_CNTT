import { createSlice } from "@reduxjs/toolkit";

const guestSlice = createSlice({
  name: "guest",
  initialState: {
    guestId: null,
    first_name: null,
    last_name: null,
    avatar: null,
    friend: false,
  },
  reducers: {
    setInfoGuest: (state, action) => {
      const { user, friend } = action.payload;

      state.guestId = user._id;
      state.first_name = user.first_name;
      state.last_name = user.last_name;
      state.avatar = user.avatar;
      state.friend = friend;
    },
  },
});

export const { setInfoGuest } = guestSlice.actions;

export default guestSlice.reducer;

export const selectGuestFrienndCheck = (state) => state.guest.friend;
