import { apiSlice } from "../api/api.slice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/api/auth/login",
        method: "post",
        credentials: "include",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        // mode: 'no-cors',
      }),
    }),
    getUsers: builder.query({
      query: () => `user`,
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;
