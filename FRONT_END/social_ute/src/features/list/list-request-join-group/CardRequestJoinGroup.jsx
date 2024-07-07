import CardBaseLayout from "combine/card-base/CardBaseLayout";
import { Button } from "components/button";
import { useActionRequest } from "hook/manage-group/useActionRequest";
import { CircleCheck, CircleX } from "lucide-react";
import React from "react";
import { getFullName } from "utils/user.utils";

const clsBaseButton = "p-2 flex gap-2";

const CardRequestJoinGroup = ({
  item,
  permission,
  role,
  groupId,
  ...props
}) => {
  const name = getFullName(item.first_name, item.last_name);

  const { handleAcceptRequest, handleRejectRequest, isLoading } =
    useActionRequest();

  return (
    <CardBaseLayout
      align="vertical"
      className="w-[500px] items-center justify-between gap-4"
      header={
        <img
          src={item.avatar.url}
          className="w-20 h-20 rounded-full object-cover"
          loading="lazy"
          alt="img"
        />
      }
      body={
        <div className="flex flex-col gap-2 h-full justify-center items-start cursor-pointer w-full">
          <p>{name}</p>
          <p>Khoa</p>
        </div>
      }
      footer={
        <div className="flex gap-2">
          <Button
            className={clsBaseButton}
            variant="outline"
            onClick={() =>
              handleAcceptRequest(permission, role, groupId, item._id)
            }
            disabled={isLoading}
          >
            Đồng ý
            <CircleCheck size={20} color="#15af12" strokeWidth={1.25} />
          </Button>
          <Button
            variant="outline"
            className={clsBaseButton}
            onClick={() =>
              handleRejectRequest(permission, role, groupId, item._id)
            }
            disabled={isLoading}
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

export default CardRequestJoinGroup;
