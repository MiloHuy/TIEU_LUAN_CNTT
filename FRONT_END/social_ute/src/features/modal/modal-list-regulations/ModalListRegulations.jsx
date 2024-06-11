import clsx from "clsx";
import LoadingComponent from "combine/loading-component";
import { Button } from "components/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "components/dialog";
import { TYPELOADING } from "constants/type.const";
import { useGetAllRegulations } from "hook/group/useGetAllRegulations";
import { useParams } from "react-router-dom";

const ModalListRegulations = ({ trigger, title, className }) => {
  const { groupId } = useParams()
  const { isLoading, resData, fetchAllRegulations } = useGetAllRegulations()

  return (
    <Dialog>
      <DialogTrigger asChild onClick={() => fetchAllRegulations(groupId)}>
        {trigger ? trigger : <Button>Chọn</Button>}
      </DialogTrigger>

      <DialogContent className={clsx('min-w-[250px] min-h-[400px] p-2 flex flex-col gap-4 items-center font-quick_sans', className)}>
        <DialogHeader>
          <DialogTitle>{title ? title : 'Danh sách nội quy của nhóm'}</DialogTitle>
        </DialogHeader>

        <LoadingComponent type={TYPELOADING.TITLE} condition={isLoading}>
          {
            resData && resData.map((regulation, index) => (
              <div key={regulation.id} className='grid gap-2 w-full'>
                <p>Nội dung {index + 1}: {regulation}</p>
              </div>
            ))
          }
        </LoadingComponent>
      </DialogContent>
    </Dialog >
  )
}

export default ModalListRegulations
