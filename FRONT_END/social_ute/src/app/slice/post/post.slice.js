import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    post_id: null,
    post_img: null,
    post_description: null,
  },
  reducers: {
    setInfoPost: (state, action) => {
      const { post } = action.payload.data;

      state.post_img = post.post_img.url;
      state.post_description = post.post_description;
    },
  },
});

export const { setInfoPost } = postSlice.actions;

export default postSlice.reducer;

// export const selectPostId = (state) => state.post.postId;
export const selectPostImg = (state) => state.post.post_img;
export const selectPostDescription = (state) => state.post.post_description;
