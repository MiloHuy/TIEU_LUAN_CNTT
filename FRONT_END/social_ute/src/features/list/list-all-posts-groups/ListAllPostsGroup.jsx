import LoadingComponent from "combine/loading-component";
import { TYPELOADING } from "constants/type.const";
import { useAllPostManage } from "hook/manage-group/useAllPostManage";
import React, { useEffect } from "react";
import { formatDate } from "utils/format-date.utils";
import { getFullName } from "utils/user.utils";

const ListAllPostsGroup = ({ permission, role, groupId }) => {
  const { fetchAllPostsManage, posts: allPosts } = useAllPostManage();

  useEffect(() => {
    fetchAllPostsManage(permission, role, groupId);
  }, [fetchAllPostsManage, groupId, permission, role]);

  return (
    <LoadingComponent type={TYPELOADING.TITLE} condition={Boolean(allPosts)}>
      <div className="grid lg:grid-cols-3 gap-2 sm:grid-cols-1 w-full justify-items-center">
        {allPosts?.map((post) => (
          <div className="flex flex-col gap-2" key={post.id}>
            <img
              src={post.post_img[0].url}
              alt="post_img"
              className="w-[400px] h-80 object-fill rounded-lg cursor-pointer"
            />
            <p className="text-center">
              Người đăng:{" "}
              {getFullName(post.user_id.first_name, post.user_id.last_name)}
            </p>
            <p className="text-center">
              Ngày đăng: {formatDate(post.create_post_time)}
            </p>
          </div>
        ))}
      </div>
    </LoadingComponent>
  );
};

export default ListAllPostsGroup;
