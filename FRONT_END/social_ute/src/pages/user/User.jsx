import CardPostUser from "features/card-post-user";
import Header from "layout/header";
import { useCallback, useEffect, useState } from "react";
import { getAllPost } from "services/post.svc";

const User = () => {
    const [posts, setPosts] = useState([])

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
                <div className="w-full h-[80px] flex flex-row gap-1 overflow-hidden mx-2">
                    <Header />
                </div>

                <div className="flex flex-col items-center pt-3 gap-3 ">
                    {
                        posts.data?.posts.map((post) => {
                            return (
                                <CardPostUser post_img={post.post_img} post_description={post.post_description} />
                            )
                        })
                    }
                </div>
            </div>

            <div className='col-span-2 border'>Suggest add friend</div>
        </div>
    )
}

export default User

