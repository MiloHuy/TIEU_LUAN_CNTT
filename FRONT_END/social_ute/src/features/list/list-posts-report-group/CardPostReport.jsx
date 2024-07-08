import CardBaseLayout from "combine/card-base/CardBaseLayout";
import { Button } from "components/button";
import HeaderPostUser from "layout/header-post-user";
import { CircleCheck, CircleX } from "lucide-react";
import React from "react";
import { formatDate } from "utils/format-date.utils";
import { getFullName } from "utils/user.utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "components/carousel";
import { useDeletePostReport } from "hook/manage-group/useDeletePostReport";

const CardPostReport = ({
  postData,
  userData,
  permission,
  role,
  groupId,
  reason,
  createReportTime,
  reportId,
  ...props
}) => {
  const fullName = getFullName(
    postData.user_id?.first_name,
    postData.user_id?.last_name
  );
  const tileTime = `Thời gian đăng : ${formatDate(createReportTime)}`;
  const { handleDeleteReportPost, isLoading } = useDeletePostReport();

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
          <Carousel className="w-full max-h-[450px]">
            <CarouselContent>
              {postData.post_img?.map((img, index) => (
                <CarouselItem key={index}>
                  <img
                    lazy="loading"
                    src={img.url}
                    alt="post"
                    className="w-full h-[450px] object-fill"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>

          <p className="truncate ...">Lý do: {reason}</p>
        </div>
      }
      footer={
        <div className="flex gap-2 w-full">
          <Button className="flex gap-2 w-full" variant="outline">
            Không xóa bài
            <CircleX size={20} color="#d80e0e" strokeWidth={1.25} />
          </Button>

          <Button
            className="flex gap-2 w-full"
            variant="outline"
            onClick={() =>
              handleDeleteReportPost(permission, role, groupId, reportId)
            }
            disabled={isLoading}
          >
            Xóa bài
            <CircleCheck size={20} color="#15af12" strokeWidth={1.25} />
          </Button>
        </div>
      }
      {...props}
    />
  );
};

export default CardPostReport;
