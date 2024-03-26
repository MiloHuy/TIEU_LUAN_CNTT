import clsx from "clsx";
import { Button } from "components/button";
import { Dialog, DialogContent, DialogTrigger } from "components/dialog";
import FormUploadImageAvatar from "features/form/form-upload-image-avatar";

const ModalChangeAvatarV2 = ({ trigger, className }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger ? trigger : <Button>Nhấn</Button>}
      </DialogTrigger>

      <DialogContent
        className={clsx(
          'min-w-[20vw] w-[40vw] min-h-[35vh] h-max p-2 grid gap-2 items-center uppercase',
          'font-bold text-lg font-quick_sans',
          className)}>
        <div className="w-full px-4 grid gap-2 font-quick_sans">
          <FormUploadImageAvatar />
        </div>
      </DialogContent>
    </Dialog >
  )
}

export default ModalChangeAvatarV2
