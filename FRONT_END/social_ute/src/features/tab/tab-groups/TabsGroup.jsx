import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/tab/Tab";
import TabContentPosts from "../tab-content-posts";
import TabMembersGroup from "../tab-members-group";

const tabsConfig = [
  {
    value: 'post',
    label: 'Bài viết',
    content: TabContentPosts,
  },
  {
    value: 'member',
    label: 'Thành viên',
    content: TabMembersGroup,
  },
];

const TabsGroup = () => {
  const classNameTabTrigger = "py-0 h-full bg-black/60 text-md"

  return (
    <div className='w-full flex justify-center font-quick_sans'>
      <Tabs
        defaultValue={tabsConfig[0].value}
        className="w-3/4">

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
            <tab.content />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

export default TabsGroup
