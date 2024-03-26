import { Tab, Tabs } from "@nextui-org/react";
import LoadingComponent from "combine/loading-component";
import { TYPELOADING } from "constants/type.const";
import ListPostUserDetail from "features/list/list-post-user-detail";
import HeaderHome from "layout/header-home";
import { Grid3X3 } from 'lucide-react';
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { getAllPostsGuest, getUserInfo, statistics } from "services/user.svc";
import { getFullName } from "utils/user.utils";

const HomeGuests = () => {
  const [userStatisics, setUserStatisics] = useState()
  const [userInfo, setUserInfo] = useState()
  const [selected, setSelected] = useState("posts");
  const [posts, setPosts] = useState()
  const { guestId } = useParams()
  const dispatch = useDispatch()
  const userName = getFullName(userInfo?.data.user?.first_name, userInfo?.data.user?.last_name)

  const fetchUserStatisics = useCallback(async () => {
    try {
      const data_statistics = await statistics(guestId)
      setUserStatisics(data_statistics)
    }
    catch (error) {
      console.log("Error: ", error)
    }
  }, [guestId])

  const fetchUserInfo = useCallback(async () => {
    try {
      const data_info = await getUserInfo(guestId)
      setUserInfo(data_info)
      dispatch(data_info.data)
    }
    catch (error) {
      console.log("Error: ", error)
    }
  }, [guestId])

  const fetchPosts = async () => {
    try {
      const posts = await getAllPostsGuest(guestId)
      setPosts([...posts.data.posts])
    }
    catch (error) {
      console.log("Error: ", error)
    }
  }

  useEffect(() => {
    fetchUserStatisics()

    fetchUserInfo()

    if (selected === 'posts') {
      fetchPosts()
    }

  }, [fetchUserStatisics, fetchUserInfo])

  return (
    <LoadingComponent type={TYPELOADING.PROPAGATE} condition={userStatisics}>
      {
        userStatisics
        &&
        <div className='grid p-2 h-screen overflow-auto gap-3'>
          <div className='p-4 row-span-1'>
            <LoadingComponent type={TYPELOADING.TITLE} condition={Boolean(userInfo)} title='Đang lấy dữ liệu'>
              <HeaderHome
                userStatisics={userStatisics.data}
                userGuestInfo={userInfo?.data}
                userName={userName}
              />
            </LoadingComponent>
          </div>

          <div className='grid grid-rows-1 justify-center '>
            <div className="flex w-full flex-col">
              <Tabs
                color="default"
                variant="light"
                selectedKey={selected}
                onSelectionChange={setSelected}
                classNames={{
                  tabList: "gap-6 w-full relative rounded-none p-0 flex justify-center",
                  cursor: "w-full",
                  tab: "max-w-[200px] w-[200px] px-0 h-12",
                }}
              >
                <Tab
                  key="posts"
                  title={
                    <div className="flex items-center space-x-2">
                      <Grid3X3 size={20} />
                      <span className="dark:text-white font-quick_sans">Posts</span>
                    </div>
                  }
                >
                  <LoadingComponent type={TYPELOADING.SPINNER} condition={posts}>
                    <ListPostUserDetail
                      posts={posts}
                      userName={userName}
                    />
                  </LoadingComponent>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      }
    </LoadingComponent>
  )
}

export default HomeGuests
