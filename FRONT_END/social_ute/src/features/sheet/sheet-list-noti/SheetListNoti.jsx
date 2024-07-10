import { useAllNotifications } from "hook/me/useAllNotifications";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "components/sheet";
import { Button } from "components/button";
import LoadingComponent from "combine/loading-component";
import { TYPELOADING } from "constants/type.const";
import CardNotis from "./CardNotis";
import { useReadNoti } from "hook/me/useReadNoti";

const SheetListNoti = ({ trigger }) => {
  const {
    fetchNotifications,
    fetchNotificationsUnread,
    notis: allNotis,
  } = useAllNotifications();

  return (
    <Sheet>
      <SheetTrigger asChild onClick={fetchNotifications}>
        {trigger}
      </SheetTrigger>
      <SheetContent
        side="left"
        className="bg-white font-quick_sans flex flex-col gap-4 w-[550px]"
      >
        <p className="text-lg font-bold">Danh sách thông báo</p>

        <div className="w-full flex gap-2 ">
          <Button className="w-full" onClick={fetchNotifications}>
            {" "}
            Tất cả
          </Button>
          <Button
            className="w-full border"
            onClick={fetchNotificationsUnread}
            variant="secondary"
          >
            Chưa đọc
          </Button>
        </div>

        <LoadingComponent
          type={TYPELOADING.TITLE}
          condition={Boolean(allNotis)}
        >
          <div className="flex flex-col gap-4 w-full h-full overflow-auto">
            {allNotis?.map((noti, index) => {
              return <CardNotis key={index} items={noti} />;
            })}
          </div>
        </LoadingComponent>
      </SheetContent>
    </Sheet>
  );
};

export default SheetListNoti;
