import { useCallback, useState } from "react";
import { postComment } from "services/post/api-post.svc";
import { toast } from "sonner";

export const usePushComment = ({ postId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handlePostComment = useCallback(
    async (commentInput) => {
      try {
        setIsLoading(true);
        await postComment(postId, { comment_content: commentInput });
        toast.success("Bình luận thành công");

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        toast("Bình luận thất bại");
        console.log("err: " + err);
      }
    },
    [postId],
  );

  return {
    isLoading,

    handlePostComment,
  };
};
