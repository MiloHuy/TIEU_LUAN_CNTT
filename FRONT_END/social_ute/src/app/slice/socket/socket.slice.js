import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
  name: "socket",
  initialState: {
    socketData: null
  },
  reducers: {
    getSocket: (state, action) => {
      state.socketData =  action.payload;
    },
  },
});

export const { getSocket } = socketSlice.actions;

export const selectSocketData = (state) => state.socket.socketData;

export default socketSlice.reducer;
