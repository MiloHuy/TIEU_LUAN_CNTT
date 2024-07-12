import CardBaseLayout from "combine/card-base/CardBaseLayout";
import { Button } from "components/button";
import CaroselVersion2 from "components/carousel/Carosel-V2";
import { PostType } from "constants/post.const";
import { useApprovePost } from "hook/manage-group/useApprovePost";
import { useDeletePostManage } from "hook/manage-group/useDeletePostManage";
import HeaderPostUser from "layout/header-post-user";
import { CircleCheck, CircleX } from "lucide-react";
import React from "react";
import { formatDate } from "utils/format-date.utils";
import { getFullName } from "utils/user.utils";

const CardPostApprove = ({
  postData,
  permission,
  role,
  groupId,
  onRefresh,
  ...props
}) => {
  const fullName = getFullName(
    postData.user_id?.first_name,
    postData.user_id?.last_name
  );
  const tileTime = `Thời gian đăng : ${formatDate(postData?.create_post_time)}`;

  const { handleApprovePost, isLoading } = useApprovePost();
  // const { handleDeletePostGroup, isLoading: loadDelete } = useDeletePostGroup();
  // const onDeletePost = async () => {
  //   const url = checkPermissionMethod(permission, {
  //     action: "deletePost",
  //     role,
  //   });

  //   if (!url) return toast.error(EMessGroup.DONT_HAVE_PERMISSION);

  //   await handleDeletePostGroup(url, groupId, postData._id);
  // };

  const { handleDeletePostManage, isLoading: loadDelete } =
    useDeletePostManage();

  return (
    <CardBaseLayout
      align="horizontal"
      className="w-[500px] justify-between items-center p-0"
      header={
        <HeaderPostUser
          className="h-16 rounded-lg w-full"
          img={postData.user_id?.avatar.url}
          name={fullName}
          privacy={postData.privacy}
          titleTime={tileTime}
        />
      }
      body={
        <div className="max-h-[550px] w-full">
          <CaroselVersion2
            className="h-[500px] w-full"
            type={PostType.POST_IMG}
            slides={postData.post_img}
          />

          <p className="truncate ...">
            Mô tả bài viết: {postData.post_description}
          </p>
        </div>
      }
      footer={
        <div className="flex gap-2 w-full">
          <Button
            className="flex gap-2 w-full"
            variant="outline"
            disabled={isLoading}
            onClick={async () => {
              await handleApprovePost(permission, role, groupId, postData._id);
              onRefresh && (await onRefresh());
            }}
          >
            Duyệt bài
            <CircleCheck size={20} color="#15af12" strokeWidth={1.25} />
          </Button>
          <Button
            className="flex gap-2 w-full"
            variant="outline"
            disabled={loadDelete}
            onClick={async () => {
              await handleDeletePostManage(
                permission,
                role,
                groupId,
                postData._id
              );

              onRefresh && (await onRefresh());
            }}
          >
            Từ chối
            <CircleX size={20} color="#d80e0e" strokeWidth={1.25} />
          </Button>
        </div>
      }
      {...props}
    />
  );
};

export default CardPostApprove;
