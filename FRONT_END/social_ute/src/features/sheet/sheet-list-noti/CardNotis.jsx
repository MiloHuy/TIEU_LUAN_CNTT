import React from "react";
import CardBaseLayout from "combine/card-base/CardBaseLayout";
import { formatDate } from "utils/format-date.utils";
import { useNavigate } from "react-router-dom";
import { useReadNoti } from "hook/me/useReadNoti";

const CardNotis = ({ items, props }) => {
  const navigate = useNavigate();
  const { handleReadNotification } = useReadNoti();

  return (
    <CardBaseLayout
      align="vertical"
      onClick={async () => {
        await handleReadNotification(items._id);
        navigate(`/welcome/post/${items.post_id}`);
      }}
      className={`w-full items-center justify-between gap-4 ${
        items.read ? "border-black" : "border-blue-500"
      }`}
      header={
        <img
          src={items.avatar.url}
          className="w-20 h-20 rounded-full object-cover"
          loading="lazy"
          alt="img"
        />
      }
      body={
        <div className="flex flex-col gap-2 h-full justify-center items-start cursor-pointer w-full">
          <p className="text-sm">{items.noti_content}</p>
          <p>{formatDate(items.noti_create_time)}</p>
        </div>
      }
      {...props}
    />
  );
};

export default CardNotis;
