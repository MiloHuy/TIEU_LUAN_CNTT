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
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;
