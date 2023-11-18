import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    phone_number: null,
    token: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { data, values } = action.payload;
      console.log("data:", data);

      state.phone_number = values.phone_number;
      state.token = data.token;
    },
    logOut: (state, action) => {
      state.phone_number = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;
