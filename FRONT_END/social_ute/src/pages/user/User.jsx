import { selectCurrenUser } from "app/slice/auth/auth.slice";
import LoadingComponent from "combine/loading-component";
import Calendar from "components/calendar";
import Clock from "components/clock";
import { TYPELOADING } from "constants/type.const";
import ListPostUser from "features/list/list-post-user";
import ListSuggestFriends from "features/list/list-suggest-friends";
import ProfileUser from "features/profile-user";
import { useAllPost } from "hook/posts/useAllPosts";
import Header from "layout/header";
import { Loader2 } from 'lucide-react';
import { useEffect } from "react";
import { useSelector } from "react-redux";
const { getFullName } = require("utils/user.utils");

const User = () => {
  const { posts, onIntersection, hasMore, elementRef } = useAllPost();

  const user = useSelector(selectCurrenUser);
  const userName = getFullName(user.first_name, user.last_name);

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection)
    if (observer && elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (observer) {
        observer.disconnect()
      }
    }
  }, [posts])

  return (
    <div className='flex gap-1 w-full h-screen'>
      <div className='flex flex-col gap-2 '>
        <div className="w-full h-[80px] flex flex-row items-end gap-1 pt-3">
          {
            posts ?
              <Header />
              :
              ''
          }
        </div>

        <div className="flex flex-col items-center pt-3 gap-3 ">
          <LoadingComponent type={TYPELOADING.TITLE} condition={posts} title='Đang lấy dữ liệu'>
            <ListPostUser
              posts={posts} />
          </LoadingComponent>

          {
            hasMore &&
            <div className='flex items-center justify-center h-full' ref={elementRef}>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            </div>
          }
        </div>
      </div>

      <LoadingComponent type={TYPELOADING.SPINNER} condition={posts}>
        <div className='col-span-2 h-full'>
          <div className='flex flex-col gap-4 p-6 '>
            <ProfileUser userName={userName} />

            <div className='h-max w-full border border-black dark:border-white rounded-lg'>
              <Calendar />
            </div>

            <ListSuggestFriends />

            <Clock />
          </div>
        </div>
      </LoadingComponent>
    </div>
  )
}

export default User
