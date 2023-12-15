import Calendar from "components/calendar";
import ListPostUser from "features/list/list-post-user";
import ListSuggestFriends from "features/list/list-suggest-friends";
import ProfileUser from "features/profile-user";
import Header from "layout/header";
import { useCallback, useEffect, useState } from "react";
import { getAllPost } from "services/post.svc";
import { getUserNameFromCookie } from "utils/user.utils";

const User = () => {
    const [posts, setPosts] = useState([])

    const userName = getUserNameFromCookie()

    const fetchAllPosts = useCallback(async () => {
        try {
            const allPosts = await getAllPost()
            setPosts({ ...allPosts })
        }
        catch (error) {
            console.log("Error: ", error)
        }
    }, [])

    useEffect(() => {
        fetchAllPosts()

    }, [fetchAllPosts])

    return (
        <div className='grid grid-cols-5 gap-1 w-full h-screen overflow-y-scroll'>
            <div className='flex flex-col col-span-3 gap-2 '>
                <div className="w-full h-[80px] flex flex-row gap-1 overflow-hidden mx-2 px-2 py-2">
                    <Header />
                </div>

                <div className="flex flex-col items-center pt-3 gap-3 ">
                    <ListPostUser
                        posts={posts.data?.posts} />
                </div>
            </div>

            <div className='col-span-2 h-full'>
                <div className='flex flex-col gap-4 p-6 '>
                    <div className='relative w-full flex'>
                        <ProfileUser userName={userName} />
                    </div>

                    <div className='h-max w-full border rounded-lg'>
                        <Calendar />
                    </div>

                    <div className='w-full '>
                        <ListSuggestFriends />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User
