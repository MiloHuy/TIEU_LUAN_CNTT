import { selectRolePermission } from "app/slice/group/group.slice";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/tab/Tab";
import { EMessGroup } from "constants/group/enum";
import { groupPermission } from "constants/group/permission.const";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { checkPermission } from "utils/auth.utils";
import TabContentPosts from "../tab-content-posts";
import TabMembersGroup from "../tab-members-group";

const tabsConfig = [
  {
    value: 'allPosts',
    label: 'Bài viết',
    content: TabContentPosts,
  },
  {
    value: 'allMember',
    label: 'Thành viên',
    content: TabMembersGroup,
  },
];

const TabsGroup = () => {
  const classNameTabTrigger = "py-0 h-full bg-black/60 text-md"
  const rolePermission = useSelector(selectRolePermission)
  const { permission, role } = rolePermission
  const [selectTab, setSelectTab] = useState(tabsConfig[0].value)

  const { category, method, endPoint } = useMemo(() =>
    groupPermission[role]?.[selectTab], [role, selectTab]);

  const isCheckPermission = useMemo(() =>
    checkPermission(permission, category, method, endPoint),
    [permission, category, method, endPoint]
  )

  return (
    <div className='w-full flex justify-center font-quick_sans'>
      <Tabs
        defaultValue={tabsConfig[0].value}
        className="w-3/4"
        onValueChange={(value) => setSelectTab(value)}
      >
        <TabsList className='w-full grid grid-cols-2 gap-2 h-[50px] bg-slate-600'>
          {tabsConfig.map(tab => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={classNameTabTrigger}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabsConfig.map(tab => (
          <TabsContent key={tab.value} value={tab.value} className='w-full h-full'>
            {
              isCheckPermission ?
                <tab.content /> :
                <p className="text-center"> {EMessGroup.DONT_HAVE_PERMISSION}</p>
            }
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

export default TabsGroup
