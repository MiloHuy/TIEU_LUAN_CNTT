import { Spinner } from "@nextui-org/react";
import Calendar from "components/calendar";
import Clock from "components/clock";
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
                <div className="w-full h-[80px] flex flex-row items-end gap-1 overflow-hidden mx-2 px-2 py-2">
                    {
                        posts.data ?
                            <Header />
                            :
                            ''
                    }

                </div>

                <div className="flex flex-col items-center pt-3 gap-3 ">
                    <ListPostUser
                        posts={posts.data?.posts} />
                </div>
            </div>

            {
                posts.data
                    ?
                    <div className='col-span-2 h-full'>
                        <div className='flex flex-col gap-4 p-6 '>
                            <div className='relative w-full flex'>
                                <ProfileUser userName={userName} />
                            </div>
                            <div className='h-max w-full border border-black dark:border-white rounded-lg'>
                                <Calendar />
                            </div>

                            <div className='w-full '>
                                <ListSuggestFriends />
                            </div>

                            <div className="w-full flex justify-end px-1">
                                <Clock />
                            </div>
                        </div>
                    </div>
                    :
                    <div className='w-full h-full flex items-center justify-center'>
                        <Spinner color="default" size="lg" />
                    </div >
            }
        </div>
    )
}

export default User
