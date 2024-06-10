import { Button } from "components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "components/dropdown";
import { ChevronDown } from 'lucide-react';
import { Fragment } from "react";
import { contentDropdownShowMoreGroup } from "./constanst";
import { RenderContentDropDown } from "./utils";

const DropDownShowMoreOptionsGroup = ({ permission }) => {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button className='w-[40px] hover:bg-transparent' variant='outline'>
          <ChevronDown size={28} strokeWidth={0.75} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='text-sm font-quick_sans'>
        {contentDropdownShowMoreGroup.map((item, index) => {
          return (
            <Fragment key={index}>
              {
                permission[item.value.category]
                &&
                permission[item.value.category].hasOwnProperty(item.value.method)
                &&
                RenderContentDropDown(permission, item.value.endPoint, item.title)
              }
            </Fragment>
          )
        })}

        <DropdownMenuItem className='flex gap-2' onSelect={(e) => e.preventDefault()}>
          <p>Chia sẻ nhóm</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu >
  )
}

export default DropDownShowMoreOptionsGroup
