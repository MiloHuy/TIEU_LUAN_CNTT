export const API_POST_ENDPOINT = {
  GET: {
    all_posts: "/posts",
    post_id: "/posts/:id",
    comment_post: "/comments/:id ",
    post_saved: "/me/stored/posts",
  },
  POST: {
    create_post: "/posts/create",
    store_post: "/posts/store/:id",
    like_post: "/posts/like/:id",
    create_comment: "/comments/create/:id",
    like_comment: "/comments/like/:id",
  },
  PUT: {
    update_post: "/posts/:id",
    update_privacy: "/posts/privacy/:id",
  },
  DELETE: {
    delete_post: "/posts/:id",
  },
};
