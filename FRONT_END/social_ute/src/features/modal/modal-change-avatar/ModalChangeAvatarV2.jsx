import clsx from "clsx";
import { Button } from "components/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "components/dialog";
import FormUploadImageAvatar from "features/form/form-upload-image-avatar";

const ModalChangeAvatarV2 = ({ trigger, className, title }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger ? trigger : <Button>Nhấn</Button>}
      </DialogTrigger>

      <DialogContent
        className={clsx(
          'min-w-[20vw] w-[40vw] min-h-[35vh] h-[80vh] p-2 grid gap-2 items-center uppercase',
          'font-bold text-lg font-quick_sans',
          className)}>
        <DialogHeader >
          <DialogTitle className='text-center text-xl'>{title}</DialogTitle>
        </DialogHeader>

        <FormUploadImageAvatar keyName='avatar' isReload={true} />
      </DialogContent>
    </Dialog >
  )
}

export default ModalChangeAvatarV2
