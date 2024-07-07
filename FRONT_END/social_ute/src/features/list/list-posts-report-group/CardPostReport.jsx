import CardBaseLayout from "combine/card-base/CardBaseLayout";
import { Button } from "components/button";
import CaroselVersion2 from "components/carousel/Carosel-V2";
import { PostType } from "constants/post.const";
import HeaderPostUser from "layout/header-post-user";
import { CircleCheck, CircleX } from "lucide-react";
import React from "react";
import { formatDate } from "utils/format-date.utils";
import { getFullName } from "utils/user.utils";

const CardPostReport = ({ postData, permission, role, groupId, ...props }) => {
  const fullName = getFullName(
    postData.user_id?.first_name,
    postData.user_id?.last_name
  );
  const tileTime = `Thời gian đăng : ${formatDate(postData?.create_post_time)}`;
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
            // disabled={isLoading}
            // onClick={() =>
            //   handleApprovePost(permission, role, groupId, postData._id)
            // }
          >
            Xóa bài
            <CircleCheck size={20} color="#15af12" strokeWidth={1.25} />
          </Button>
          <Button className="flex gap-2 w-full" variant="outline">
            Không xóa bài
            <CircleX size={20} color="#d80e0e" strokeWidth={1.25} />
          </Button>
        </div>
      }
      {...props}
    />
  );
};

export default CardPostReport;
