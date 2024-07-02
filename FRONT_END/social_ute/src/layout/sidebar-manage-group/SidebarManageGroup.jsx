import React, { Fragment, useEffect, useMemo, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "components/accordion";
import { Button } from "components/button";
import { ARRAY_SIDEBAR_MANAGE_GROUP } from "./constanst";
import { checkPermissionMethod } from "utils/auth.utils";
import LoadingComponent from "combine/loading-component";
import { TYPELOADING } from "constants/type.const";
import { useSelector } from "react-redux";
import { selectRolePermission } from "app/slice/group/group.slice";

const ManageGroupItem = ({ mainTitle, childTitle, ...props }) => {
  return (
    <AccordionItem
      value={mainTitle}
      className="font-quick_sans px-2"
      {...props}
    >
      <AccordionTrigger>{mainTitle}</AccordionTrigger>
      <AccordionContent key={childTitle}>
        <Button variant="ghost" className="w-full flex justify-start px-4">
          {childTitle}
        </Button>
      </AccordionContent>
    </AccordionItem>
  );
};

const SidebarManageGroup = () => {
  const rolePermission = useSelector(selectRolePermission);
  const { permission, role } = rolePermission;

  const renderItemAccordion = useMemo(() => {
    return ARRAY_SIDEBAR_MANAGE_GROUP.map((item) => {
      if (permission && permission[item.main.category]) {
        const filteredChilds = item.childs.filter((child) =>
          checkPermissionMethod(permission, {
            action: child.action,
            role,
            manage: item.manage,
          })
        );

        return (
          <AccordionItem
            value={item.main.category}
            className="font-quick_sans px-2 text-lg"
          >
            <AccordionTrigger className="hover:no-underline">
              {item.main.name}
            </AccordionTrigger>
            {filteredChilds.map((child) => (
              <AccordionContent key={child.action}>
                <Button
                  variant="ghost"
                  className="w-full flex justify-start px-4 border-l border-r"
                >
                  {child.name}
                </Button>
              </AccordionContent>
            ))}
          </AccordionItem>
        );
      }
      return null;
    });
  }, [permission, role]);

  return (
    <LoadingComponent type={TYPELOADING.NULL} condition={Boolean(permission)}>
      <Accordion type="multiple">{renderItemAccordion}</Accordion>
    </LoadingComponent>
  );
};

export default SidebarManageGroup;
