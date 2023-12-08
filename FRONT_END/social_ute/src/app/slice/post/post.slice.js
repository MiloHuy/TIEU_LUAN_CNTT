import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    post_id: null,
    post_img: null,
    post_description: null,
    liked: false,
    saved: false,
    number_likes: 0,
  },
  reducers: {
    setInfoPost: (state, action) => {
      const { post } = action.payload.data;

      state.posts = { ...post };

      state.post_img = state.posts.post_img.url;
      state.post_description = state.posts.post_description;
    },

    setStatusPost: (state, action) => {
      const { like, save, number_likes } = action.payload;

      state.liked = like;
      state.saved = save;
      state.number_likes = number_likes;
    },

    setPostInit: (state) => {
      state.post_id = null;
      state.post_img = null;
      state.post_description = null;
      state.liked = false;
      state.saved = false;
      state.number_likes = 0;
    },
  },
});

export const { setInfoPost, setStatusPost, setPostInit } = postSlice.actions;

export default postSlice.reducer;

export const selectPostImg = (state) => state.post.post_img;
export const selectPostDescription = (state) => state.post.post_description;

export const selectStatusLikedPost = (state) => state.post.liked;
export const selectStatusSavedPost = (state) => state.post.saved;
export const selectStatusNumberLikes = (state) => state.post.number_likes;
