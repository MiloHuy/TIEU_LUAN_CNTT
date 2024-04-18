import { Dialog, DialogContent, DialogTrigger } from "components/dialog";
import { useNavigate } from 'react-router-dom';
import ContentModalGroup from "./ContentModalGroup";

const ModalGroup = ({ trigger }) => {
  const navigate = useNavigate()

  const handleNavigateGroup = (link) => {
    if (!link) return;

    navigate(link)
  }

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
