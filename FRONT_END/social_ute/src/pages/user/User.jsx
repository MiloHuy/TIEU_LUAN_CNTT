import ListPostUser from "features/list-post-user";
import ListSuggestFriends from "features/list-suggest-friends";
import ProfileUser from "features/profile-user";
import Header from "layout/header";
import { useCallback, useEffect, useState } from "react";
import { getAllPost } from "services/post.svc";

const User = () => {
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

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
        setIsLoading(!isLoading)

    }, [fetchAllPosts])

    console.log("isLoading: ", isLoading)

    // console.log("Posts: " + Object.values(posts.data.posts?.['user_id']))

    return (
        <div className='grid grid-cols-5 gap-1 w-full h-screen overflow-y-scroll'>
            <div className='flex flex-col col-span-3 gap-2 '>
                <div className="w-full h-[80px] flex flex-row gap-1 overflow-hidden mx-2 px-2 py-2">
                    <Header />
                </div>

                <div className="flex flex-col items-center pt-3 gap-3 ">
                    <ListPostUser
                        isLoaded={isLoading}
                        posts={posts.data?.posts} />
                </div>
            </div>

            <div className='col-span-2'>
                <div className='grid gird-rows-2 gap-4 p-6'>
                    <div className='relative w-full flex'>
                        <ProfileUser />
                    </div>

                    <div>
                        <ListSuggestFriends />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User