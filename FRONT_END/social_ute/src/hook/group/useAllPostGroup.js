import { EMessGroup } from "constants/group/enum";
import { TOAST_OPTION_DEFAULT } from "constants/toast.const";
import { useCallback, useRef, useState } from "react";
import { toast } from "react-toastify";
import { getAllPostGroup } from "services/group/api-get.svc";
import { checkPermissionMethod } from "utils/auth.utils";
import { errorHandler } from "utils/error-response.utils";

export const useAllPostGroup = (permission, role, groupId) => {
  const [isLoading, setIsLoading] = useState(false);
  const [resPonse, setResPonse] = useState([]);

  const [hasMore, setHasMore] = useState(true);
  const elementRef = useRef(null);
  const [filter, setFilter] = useState({
    page: 1,
    size: 6,
  });

  const fetchAllPostGroup = useCallback(
    async (page, size) => {
      try {
        const url = checkPermissionMethod(permission, {
          action: "allPosts",
          role,
        });

        if (!url) {
          setIsLoading(true);
          setResPonse([]);
          return toast.error(
            EMessGroup.DONT_HAVE_PERMISSION,
            TOAST_OPTION_DEFAULT,
          );
        }

        const res = await getAllPostGroup(url, groupId, {
          page: page,
          size: size,
        });
        if (res.data.posts.length === 0) {
          setHasMore(false);
        } else {
          setResPonse((prev) => {
            if (Array.isArray(prev)) {
              const newData = [...prev, ...res.data.posts];
              return newData;
            } else {
              return [...res.data.posts];
            }
          });

          setFilter((prev) => ({
            ...prev,
            page: prev.page + 1,
          }));
        }
        // setResPonse(res.data.posts);

        setIsLoading(true);
      } catch (error) {
        setIsLoading(true);
        setResPonse([]);
        errorHandler(error);
      }
    },
    [groupId, permission, role],
  );

  const onIntersection = useCallback(
    (entries) => {
      const firstEntries = entries[0];
      if (firstEntries.isIntersecting && hasMore) {
        fetchAllPostGroup(filter.page, filter.size);
      }
    },
    [filter.page, filter.size, fetchAllPostGroup, hasMore],
  );

  return {
    isLoading,
    resPonse,
    elementRef,
    hasMore,

    onIntersection,
    fetchAllPostGroup,
  };
};
