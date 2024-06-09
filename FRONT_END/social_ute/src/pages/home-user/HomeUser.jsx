import { Spinner, Tab, Tabs } from "@nextui-org/react";
import { selectCurrenUser } from "app/slice/auth/auth.slice";
import LoadingComponent from "combine/loading-component";
import { TYPELOADING } from "constants/type.const";
import ListFriendsUser from "features/list/list-friends-user";
import ListPostUserDetail from "features/list/list-post-user-detail";
import ListStoryUserDetail from 'features/list/list-story-user-detail';
import { useMeAllStory } from "hook/me/useMeAllStory";
import { useFollowAndFollwing } from "hook/statisic/useFollowAndFollwing";
import HeaderHome from "layout/header-home";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { getPostSaved } from "services/post/api-get.svc";
import { getFullName } from "utils/user.utils";
import { genTitleTab } from "./utils";

const HomeUser = () => {
  const [selected, setSelected] = useState("posts");

  const { userId } = useParams()
  const user = useSelector(selectCurrenUser)

  const { userStatisics, fetchUserStatisics } = useFollowAndFollwing(userId)
  const { stories: meStories, fetchMeStories } = useMeAllStory(userId)

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
      case 'story':
        fetchMeStories()
        break
      case 'postsSaved':
        fetchMePostSaved()
        break
      default:
        return
    }
  }, [selected, fetchMeStories, fetchMePostSaved])

  return (
    <LoadingComponent type={TYPELOADING.PROPAGATE} condition={userStatisics}>
      <div className='flex flex-col w-full h-screen p-4'>
        <HeaderHome
          userStatisics={userStatisics}
          userName={getFullName(user.first_name, user.last_name)}
          userAvatar={user.avatar.url}
        />

        <div className='flex justify-center mt-2'>
          <div className="flex w-full flex-col gap-4">
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
              <Tab key="posts" title={genTitleTab("posts")}>
                <ListPostUserDetail
                  userName={getFullName(user.first_name, user.last_name)}
                />
              </Tab>

              <Tab key="story" title={genTitleTab("story")}>
                <ListStoryUserDetail stories={[]} />
              </Tab>

              <Tab key="friends" title={genTitleTab("friends")}>
                <ListFriendsUser />
              </Tab>

              <Tab key="postsSaved" title={genTitleTab("postsSaved")}>
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
    </LoadingComponent >
  )
}

export default HomeUser
