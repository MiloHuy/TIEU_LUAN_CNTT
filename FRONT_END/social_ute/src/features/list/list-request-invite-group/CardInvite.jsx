import CardBaseLayout from "combine/card-base/CardBaseLayout";
import { Button } from "components/button";
import { useActionInviteGroup } from "hook/group/useActionInviteGroup";
import { CircleCheck, CircleX } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const clsBaseButton = "p-2 flex gap-2";

const CardInvite = ({ item, onRefresh }) => {
  const navigate = useNavigate();
  const { isLoading, handleAcceptInvite, handleRejectInvite } =
    useActionInviteGroup();

  return (
    <CardBaseLayout
      align="vertical"
      className="w-max items-center justify-between gap-4"
      header={
        <img
          src={item?.group_id?.avatar?.url}
          className="w-[100px] h-[120px] rounded-lg object-fill cursor-pointer"
          loading="lazy"
          alt="img"
          onClick={() => navigate(`/welcome/groupDetails/${item.group_id._id}`)}
        />
      }
      body={
        <div className="flex flex-col gap-2 h-full justify-center items-start cursor-pointer w-full">
          <p>{item.group_id.name}</p>
        </div>
      }
      footer={
        <div className="flex gap-2">
          <Button
            className={clsBaseButton}
            variant="outline"
            onClick={async () => {
              await handleAcceptInvite(item.group_id._id);
              onRefresh && (await onRefresh());
            }}
            disabled={isLoading}
          >
            Đồng ý
            <CircleCheck size={20} color="#15af12" strokeWidth={1.25} />
          </Button>
          <Button
            variant="outline"
            className={clsBaseButton}
            onClick={async () => {
              await handleRejectInvite(item.group_id._id);
              onRefresh && (await onRefresh());
            }}
            disabled={isLoading}
          >
            Từ chối
            <CircleX size={20} color="#d80e0e" strokeWidth={1.25} />
          </Button>
        </div>
      }
      // {...props}
    />
  );
};

export default CardInvite;
