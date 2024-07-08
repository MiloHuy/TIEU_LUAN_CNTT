import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "components/dialog";
import { Button } from "components/button";
import clsx from "clsx";
import LoadingComponent from "combine/loading-component";
import { TYPELOADING } from "constants/type.const";
import { Check, CircleX } from "lucide-react";
import { useReportPostGroup } from "hook/group/useReportPostGroup";
import { Textarea } from "components/textarea";

const ModalReportPostGroup = ({
  trigger,
  className,
  title,
  isWarning,
  description,
  url,
  groupId,
  postId,
}) => {
  const [contentReport, setContentReport] = useState("");
  const { handleReportPostGroup, isLoading } = useReportPostGroup();

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger ? trigger : <Button>Xóa</Button>}
      </DialogTrigger>

      <DialogContent
        className={clsx(
          "min-w-[450px] min-h-[200px] p-2 grid gap-2 items-center",
          className
        )}
      >
        <p className="text-center font-bold text-lg font-quick_sans">{title}</p>
        <p
          className={`text-center font-bold text-lg font-quick_sans ${
            isWarning ? "text-red" : ""
          }`}
        >
          {description}
        </p>

        <Textarea
          className="border border-black dark:border-white"
          rows={7}
          placeholder="Lý do tố cáo"
          onChange={(e) => setContentReport(e.target.value)}
        />

        <div className="w-full grid grid-cols-2 gap-2 items-center ">
          <Button
            disabled={isLoading}
            variant="icon"
            onClick={() =>
              handleReportPostGroup({
                url: url,
                groupId: groupId,
                postId: postId,
                content: contentReport,
              })
            }
          >
            <LoadingComponent type={TYPELOADING.SPINNER} condition={!isLoading}>
              <Check size={16} strokeWidth={0.75} />
              Tố cáo
            </LoadingComponent>
          </Button>

          <DialogClose asChild>
            <Button className="text-black/90" variant="icon" color="danger">
              <CircleX size={20} strokeWidth={1.25} />
              Hủy
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalReportPostGroup;
