import TabsGroup from "features/tab/tab-groups/TabsGroup"
import HeaderGroup from "layout/header-group"

const GroupBaseLayout = () => {
  return (
    <div className="flex flex-col gap-4 overflow-auto scroll-smooth h-screen">
      <HeaderGroup />

      <TabsGroup />
    </div>
  )
}

export default GroupBaseLayout
