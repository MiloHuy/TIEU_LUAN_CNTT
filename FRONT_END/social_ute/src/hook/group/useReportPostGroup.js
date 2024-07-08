import { useCallback, useState } from "react";
import { reportPostGroup } from "services/group/api-post.svc";
import { toast } from "sonner";
import { errorHandler } from "utils/error-response.utils";

export const useReportPostGroup = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleReportPostGroup = useCallback(async ({ url, groupId,postId ,content}) => {
    try {
      setIsLoading(true);

      await reportPostGroup(url, groupId, postId, {reason:content});
      setIsLoading(false);
      return toast.success("Báo cáo bài viết thành công");
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      errorHandler(error);
    }
  }, []);

  return { handleReportPostGroup, isLoading };
}
