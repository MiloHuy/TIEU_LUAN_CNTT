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
    const [isInitialFetch, setIsInitialFetch] = useState(false);

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
            setIsInitialFetch(true);

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
    // console.log('postsData: ' + Object.entries(postsData.posts))

    return (
        <div className='w-full h-screen overflow-y-scroll grid grid-cols-1'>
            <div className='flex flex-col gap-3 h-full w-full p-4'>
                <p className="text-black dark:text-white font-merriweather text-center text-lg">Danh sách bài viết của người dùng</p>

                <div>
                    {
                        isInitialFetch ?
                            postsData ?
                                <ListPostUserDetail
                                    posts={postsData} />
                                :
                                <div div className='flex items-center justify-center h-full'>
                                    <Spinner color="default" />
                                </div>
                            : 'Loading...'
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
