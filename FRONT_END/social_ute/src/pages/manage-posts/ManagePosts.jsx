import { Spinner } from "@nextui-org/react";
import ListPostUserDetail from "features/list/list-post-user-detail";
import { useCallback, useEffect, useState } from "react";
import { getAllPosts } from "services/admin.svc";

const ManagePosts = () => {
    const [posts, setPosts] = useState()

    const [filter, setFilter] = useState({
        page: 1,
        size: 6
    })

    const fetchAllPost = useCallback(async (page, size) => {
        try {
            const data_posts = await getAllPosts(
                {
                    page: page,
                    size: size
                }
            )
            setPosts({ ...data_posts.data })

            console.log('data_posts: ' + Object.entries(data_posts.data))
        }
        catch (err) {
            console.log('err:' + err)
        }
    }, [])

    useEffect(() => {
        fetchAllPost(
            filter.page,
            filter.size
        )
    }, [filter.page, filter.size])

    return (
        <div className='w-full h-screen overflow-y-scroll grid grid-cols-1'>
            <div className='flex flex-col gap-3 h-full w-full p-4'>
                <p className="text-black dark:text-white font-merriweather text-center text-lg">Danh sách bài viết của người dùng</p>

                <div>
                    {
                        posts ?
                            <ListPostUserDetail
                                posts={posts} />
                            :
                            <div className='flex items-center justify-center h-full'>
                                <Spinner color="default" />
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ManagePosts
