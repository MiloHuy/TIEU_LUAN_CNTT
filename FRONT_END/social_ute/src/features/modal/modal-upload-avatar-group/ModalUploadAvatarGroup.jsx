import clsx from "clsx";
import { Button } from "components/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "components/dialog";
import FormUploadImageAvatar from "features/form/form-upload-image-avatar";

const ModalUploadAvatarGroup = ({ trigger, className, title, titleButton, onChangeAvatar }) => {

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger ? trigger : <Button>Nhấn</Button>}
      </DialogTrigger>

      <DialogContent
        className={clsx(
          'min-w-[20vw] w-[40vw] min-h-[35vh] h-max p-2 flex flex-col gap-2 items-center uppercase',
          'font-bold text-lg font-quick_sans',
          className)}>
        <DialogHeader className='h-[60px] mt-2'>
          <DialogTitle className='text-center text-xl'>{title}</DialogTitle>
        </DialogHeader>

        <FormUploadImageAvatar
          keyName='groupAvatar'
          isReload={false}
          titleButton={titleButton}
          onChangeAvatar={onChangeAvatar}
        />
      </DialogContent>
    </Dialog >
  )
}

export default ModalUploadAvatarGroup
