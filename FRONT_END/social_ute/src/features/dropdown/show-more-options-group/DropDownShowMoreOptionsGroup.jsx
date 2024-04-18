import { Button } from "components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "components/dropdown";
import { ChevronDown } from 'lucide-react';

const DropDownShowMoreOptionsGroup = () => {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button className='w-[40px] hover:bg-transparent' variant='outline'>
          <ChevronDown size={28} strokeWidth={0.75} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='text-sm font-quick_sans'>
        <DropdownMenuItem className='flex gap-2' onSelect={(e) => e.preventDefault()}>
          <p>Nội quy của nhóm</p>
        </DropdownMenuItem>

        <DropdownMenuItem className='flex gap-2' onSelect={(e) => e.preventDefault()}>
          <p>Chia sẻ nhóm</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu >
  )
}

export default DropDownShowMoreOptionsGroup
