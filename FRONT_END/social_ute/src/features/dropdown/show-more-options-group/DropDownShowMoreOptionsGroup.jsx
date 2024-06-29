import { Button } from "components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "components/dropdown";
import { ChevronDown } from "lucide-react";
import { Fragment } from "react";
import { contentDropdownShowMoreGroup } from "./constanst";
import { RenderContentDropDown } from "./utils";
import { ERoleNameGroup } from "constants/group/enum";
import { catePermiss } from "constants/group/permission.const";

const DropDownShowMoreOptionsGroup = ({ permission }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button className="w-[40px] hover:bg-transparent" variant="outline">
          <ChevronDown size={28} strokeWidth={0.75} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="text-sm font-quick_sans">
        {contentDropdownShowMoreGroup.map((item, index) => {
          return (
            <Fragment key={index}>
              {permission[item.value.category] &&
                permission[item.value.category][item.value.method] &&
                RenderContentDropDown(
                  permission,
                  item.value.endPoint,
                  item.title
                )}
            </Fragment>
          );
        })}

        {permission &&
          (permission[catePermiss.MANAGE_MEMBER] ||
            permission[catePermiss.MANAGE_POST] ||
            permission[catePermiss.MANAGE_INTERACT] ||
            permission[catePermiss.MANAGE_ADMIN]) && (
            <DropdownMenuItem
              className="flex gap-2"
              onSelect={(e) => e.preventDefault()}
            >
              <p>Quản lý nhóm</p>
            </DropdownMenuItem>
          )}

        <DropdownMenuItem
          className="flex gap-2"
          onSelect={(e) => e.preventDefault()}
        >
          <p>Chia sẻ nhóm</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDownShowMoreOptionsGroup;
