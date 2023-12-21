import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    phone_number: null,
    token: null,
    loading: false,
    isAuthenticated: false,
    user: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { data, values } = action.payload;
      state.phone_number = values.phone_number;
      state.token = data.token;
    },

    authSuccess: (state, action) => {
      state.loading = true;
      state.isAuthenticated = true;
      state.user = action.payload;
    },

    authFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },

    logOut: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      state.err = null;
    },
  },
});

export const { setCredentials, authSuccess, authFail, logOut } =
  authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrenUser = (state) => state.auth.user;
