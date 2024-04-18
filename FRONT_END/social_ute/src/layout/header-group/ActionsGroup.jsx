import { Button } from "components/button";
import DropDownShowMoreOptionsGroup from "features/dropdown/show-more-options-group";
import { Plus } from 'lucide-react';

const ActionsGroup = () => {
  return (
    <div className='min-h-[100px] flex gap-4 items-end justify-center p-4'>
      <Button className='p-2 text-lg min-w-[80px]'>
        <Plus size={20} strokeWidth={1.25} />
        Mời
      </Button>

      <Button className='p-2 text-lg min-w-[150px] text-black' color='gray'>Tham gia</Button>

      <DropDownShowMoreOptionsGroup />
    </div>
  )
}

export default ActionsGroup
