import {  selectSocketData } from "app/slice/socket/socket.slice";
import { useSelector } from "react-redux";
import { likePost, storePost } from "services/post/api-post.svc";

const { useCallback, useState } = require("react");

export const useActionsPosts = ({ liked_post, saved_posts, number_likes }) => {
  const initStatusPost = {
    isLiked: liked_post,
    isSaved: saved_posts,
  };
  const [statusPost, setStatusPosts] = useState(initStatusPost);
  const [numberLikes, setNumberLikes] = useState(number_likes);
  const socket = useSelector(selectSocketData)

  const handleLikePost = useCallback(async (post_id) => {
    try {
      setStatusPosts((prev) => ({
        ...prev,
        isLiked: !prev.isLiked,
      }));

      const data_numberLike = await likePost(post_id);

      setNumberLikes(data_numberLike.data.likes);
      socket.emit('notis', { post_id, likes: data_numberLike.data.likes });
    } catch (err) {
      console.log(err);
    }
  }, [socket]);

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
