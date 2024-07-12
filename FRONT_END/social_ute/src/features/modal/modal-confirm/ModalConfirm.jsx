import clsx from "clsx";
import LoadingComponent from "combine/loading-component";
import { Button } from "components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "components/dialog";
import { TYPELOADING } from "constants/type.const";
import { Check, CircleX } from "lucide-react";
import { useCallback } from "react";

const ModalConfirm = ({
  trigger,
  handleCallback,
  title,
  description,
  isWarning,
  isLoading,
  className,
}) => {
  const handleAgree = useCallback(() => {
    handleCallback();
  }, [handleCallback]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger ? trigger : <Button>Xóa</Button>}
      </DialogTrigger>

      <DialogContent
        className={clsx(
          "min-w-[400px] min-h-[150px] p-2 grid gap-2 items-center",
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

        <div className="w-full grid grid-cols-2 gap-2 items-center ">
          <DialogClose asChild>
            <Button className="text-black/90" variant="icon">
              <CircleX size={20} strokeWidth={1.25} />
              Không
            </Button>
          </DialogClose>

          <Button
            disabled={isLoading}
            variant="icon"
            onClick={handleAgree}
            color="danger"
          >
            <LoadingComponent type={TYPELOADING.SPINNER} condition={!isLoading}>
              <Check size={16} strokeWidth={1.25} color="#fff" />
              <h1 className="text-white">Có</h1>
            </LoadingComponent>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalConfirm;
