import React from "react";
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
import { catePermiss } from "constants/group/permission.const";
import { checkPermissionMethod } from "utils/auth.utils";
import { useNavigate, useParams } from "react-router-dom";

const DropDownShowMoreOptionsGroup = ({ permission, role }) => {
  const navigate = useNavigate();
  const { groupId } = useParams();

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
              {checkPermissionMethod(permission, {
                action: item.action,
                role,
              }) &&
                RenderContentDropDown(
                  permission,
                  item.title,
                  role,
                  item.action
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
              onSelect={() => navigate(`/welcome/manageGroup/${groupId}`)}
            >
              <p>Quản lý nhóm</p>
            </DropdownMenuItem>
          )}

        <DropdownMenuItem className="flex gap-2">
          <p>Chia sẻ nhóm</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDownShowMoreOptionsGroup;
