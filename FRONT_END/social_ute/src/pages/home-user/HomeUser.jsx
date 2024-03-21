import { Spinner, Tab, Tabs } from "@nextui-org/react";
import { selectCurrenUser } from "app/slice/auth/auth.slice";
import LoadingComponent from "combine/loading-component";
import { TYPELOADING } from "constants/type.const";
import ListFriendsUser from "features/list/list-friends-user";
import ListPostUserDetail from "features/list/list-post-user-detail";
import ListStoryUserDetail from 'features/list/list-story-user-detail';
import { useMeAllFriend } from "hook/me/useMeAllFriend";
import { useMeAllPosts } from "hook/me/useMeAllPosts";
import { useMeAllStory } from "hook/me/useMeAllStory";
import { useFollowAndFollwing } from "hook/statisic/useFollowAndFollwing";
import HeaderHome from "layout/header-home";
import { Book, Bookmark, Grid3X3, Users } from 'lucide-react';
import { useCallback, useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { getPostSaved } from "services/post/api-get.svc";
import { getFullName } from "utils/user.utils";

const HomeUser = () => {
  const [selected, setSelected] = useState("posts");

  const { userId } = useParams()
  const user = useSelector(selectCurrenUser)

  const { posts: mePosts, fetchMePosts } = useMeAllPosts()
  const { userStatisics, fetchUserStatisics } = useFollowAndFollwing(userId)
  const { stories: meStories, fetchMeStories } = useMeAllStory(userId)
  const { friends: meFriends, fetchMeFriends } = useMeAllFriend()
  const navigate = useNavigate()

  const initHomeUser = {
    userStatisics: '',
    mePosts: '',
    stories: '',
    friends: '',
    postSaved: ''
  }

  const [homeUser, setHomeUser] = useState(initHomeUser)



  const fetchMePostSaved = useCallback(async () => {
    try {
      const dataPostSaved = await getPostSaved()
      setHomeUser((prev) => ({
        ...prev,
        postSaved: [...dataPostSaved.data.posts]
      }))
    }
    catch (error) {
      console.log("Error: ", error)
    }
  }, [])

  useEffect(() => {
    fetchUserStatisics()
  }, [fetchUserStatisics])

  useEffect(() => {
    switch (selected) {
      case 'posts':
        fetchMePosts()
        break
      case 'story':
        fetchMeStories()
        break
      case 'friends':
        fetchMeFriends()
        break
      case 'postsSaved':
        fetchMePostSaved()
        break
      default:
        return
    }
  }, [selected])

  return (
    <LoadingComponent type={TYPELOADING.PROPAGATE} condition={userStatisics}>
      <div className='grid  p-2 h-full w-full overflow-auto '>
        <div className='p-4 row-span-1'>
          <HeaderHome
            userStatisics={userStatisics}
            userName={getFullName(user.first_name, user.last_name)}
            userAvatar={user.avatar.url}
          />
        </div>

        <div className='grid grid-rows-1 justify-center w-full h-screen '>
          <div className="flex w-full flex-col">
            <Tabs
              color="default"
              variant="light"
              radius='md'
              selectedKey={selected}
              onSelectionChange={setSelected}
              classNames={{
                tabList: "gap-6 w-full relative rounded-none flex justify-center",
                cursor: "w-full",
                tab: "max-w-[200px] w-[150px] px-0 h-12",
              }}
            >
              <Tab
                key="posts"
                title={
                  <div className="flex items-center space-x-2">
                    <Grid3X3 size={20} />
                    <span className="dark:text-white font-quick_sans">
                      Bài viết
                    </span>
                  </div>
                }
              >
                <LoadingComponent type={TYPELOADING.SPINNER} condition={mePosts && mePosts.length !== 0}>
                  <ListPostUserDetail
                    userName={getFullName(user.first_name, user.last_name)}
                    posts={mePosts}
                  />
                </LoadingComponent>
              </Tab>

              <Tab
                key="story"
                title={
                  <div className="flex items-center space-x-2">
                    <Book size={20} />
                    <span className="dark:text-white font-quick_sans">Story</span>
                  </div>
                }
              >
                <ListStoryUserDetail stories={[]} />
              </Tab>

              <Tab
                key="friends"
                title={
                  <div className="flex items-center space-x-2">
                    <Users size={20} />
                    <span className="dark:text-white font-quick_sans">
                      Bạn bè
                    </span>
                  </div>
                }
              >
                <LoadingComponent type={TYPELOADING.SPINNER} condition={meFriends && meFriends.length !== 0}>
                  <div className='min-w-[70vw]'>
                    <ListFriendsUser
                      friends={meFriends} />
                  </div>
                </LoadingComponent>
              </Tab>

              <Tab
                key="postsSaved"
                title={
                  <div className="flex items-center space-x-2">
                    <Bookmark
                      size={20}
                      strokeWidth={1.5}
                    />
                    <span className="dark:text-white text-black font-quick_sans">
                      Bài viết đã lưu
                    </span>
                  </div>
                }
              >
                {
                  homeUser.postSaved
                    ?
                    <ListPostUserDetail
                      userName={getFullName(user.first_name, user.last_name)}
                      posts={homeUser.postSaved}
                    />
                    :
                    <div className='w-full h-full flex items-center justify-center'>
                      <Spinner color="default" size="lg" />
                    </div >
                }
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </LoadingComponent>
  )
}

export default HomeUser
