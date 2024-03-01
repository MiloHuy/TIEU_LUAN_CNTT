import { Spinner } from "@nextui-org/react";
import ListPostUserDetail from "features/list/list-post-user-detail";
import { useCallback, useEffect, useRef, useState } from "react";
import { getAllPosts } from "services/admin.svc";

const ManagePosts = () => {
    const [postsData, setPosts] = useState()

    const [filter, setFilter] = useState({
        page: 1,
        size: 6
    })

    const [hasMore, setHasMore] = useState(true)
    const elementRef = useRef(null)

    const onIntersection = useCallback((entries) => {
        const firstEntries = entries[0]
        if (firstEntries.isIntersecting && hasMore) {

            fetchAllPost(
                filter.page,
                filter.size
            )
        }
    }, [filter.page])

    const fetchAllPost = async (page, size) => {
        try {

            const data_posts = await getAllPosts(
                {
                    page: page + 1,
                    size: size
                }
            )

            if (data_posts.data.posts.length === 0) {
                setHasMore(false)
            } else {
                setPosts((prev) => {
                    if (Array.isArray(prev)) {
                        const newData = [...prev, ...data_posts.data.posts]
                        return newData
                    }
                    else {
                        return [...data_posts.data.posts]
                    }
                })

                setFilter((prev) => ({
                    ...prev,
                    page: prev.page + 1
                }))
            }

        }
        catch (err) {
            console.log('err:' + err)
        }
    }

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
    }, [postsData])

    return (
        <div className='w-full h-screen overflow-y-scroll grid grid-cols-1 overflow-x-auto'>
            <div className='flex flex-col gap-3 h-full w-full p-4'>
                <p className="text-black dark:text-white font-questrial font-bold text-2xl">Danh sách bài viết của người dùng</p>

                <div>
                    {
                        postsData ?
                            <ListPostUserDetail
                                posts={postsData} />
                            :
                            ''
                    }

                    {
                        hasMore &&
                        <div className='flex items-center justify-center h-full' ref={elementRef}>
                            <Spinner color="default" />
                        </div>
                    }
                </div>
            </div>
        </div >
    )
}

export default ManagePosts
