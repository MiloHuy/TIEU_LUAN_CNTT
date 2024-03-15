const { useCallback, useState } = require("react");
const { likePost, storePost } = require("services/post.svc");

export const useActionsPosts = ({ liked_post, saved_posts, number_likes }) => {
  const initStatusPost = {
    isLiked: liked_post,
    isSaved: saved_posts,
  };
  const [statusPost, setStatusPosts] = useState(initStatusPost);
  const [numberLikes, setNumberLikes] = useState(number_likes);

  const handleLikePost = useCallback(async (post_id) => {
    try {
      setStatusPosts((prev) => ({
        ...prev,
        isLiked: !prev.isLiked,
      }));

      const data_numberLike = await likePost(post_id);

      setNumberLikes(data_numberLike.data.likes);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleSavePost = useCallback(async (post_id) => {
    try {
      setStatusPosts((prev) => ({
        ...prev,
        isSaved: !prev.isSaved,
      }));

      await storePost(post_id);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return {
    statusPost,
    numberLikes,

    handleLikePost,
    handleSavePost,
  };
};
