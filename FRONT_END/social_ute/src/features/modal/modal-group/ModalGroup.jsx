import { Dialog, DialogContent, DialogTrigger } from "components/dialog";
import ContentModalGroup from "./ContentModalGroup";

const ModalGroup = ({ trigger }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>

      <DialogContent
        hideCloseButton={true}
        className='sm:rounded-lg overflow-hidden min-h-[45vh] max-w-[50vw]'>

        <ContentModalGroup />
      </DialogContent>
    </Dialog>
  )
}

export default ModalGroup
