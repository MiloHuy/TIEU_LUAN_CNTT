import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/tab/Tab"
import TabContentPosts from "../tab-content-posts"

const TabValue = {
  POST: 'post',
  MEMBER: 'member',
}

const genLabelTab = (value) => {
  switch (value) {
    case TabValue.POST:
      return 'Bài viết'
    case TabValue.MEMBER:
      return 'Thành viên'
    default:
      return ''
  }
}

const TabsGroup = () => {
  const classNameTabTrigger = 'py-0 h-full bg-black/60 text-md'

  return (
    <div className='w-full flex justify-center font-quick_sans'>
      <Tabs
        defaultValue={TabValue.POST}
        className="w-3/4">

        <TabsList className='w-full grid grid-cols-2 gap-2 h-[50px] bg-slate-600 '>
          <TabsTrigger value={TabValue.POST} className={`${classNameTabTrigger}`}>
            {genLabelTab(TabValue.POST)}
          </TabsTrigger>

          <TabsTrigger value={TabValue.MEMBER} className={`${classNameTabTrigger}`}>
            {genLabelTab(TabValue.MEMBER)}
          </TabsTrigger>
        </TabsList>

        <TabsContent value={TabValue.POST} className='w-full h-full'>
          <TabContentPosts />
        </TabsContent>

        <TabsContent value={TabValue.MEMBER}>

        </TabsContent>
      </Tabs>
    </div>
  )
}

export default TabsGroup
