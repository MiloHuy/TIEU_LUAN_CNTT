import { Spinner } from "@nextui-org/react";
import { selectCurrenUser } from "app/slice/auth/auth.slice";
import Calendar from "components/calendar";
import Clock from "components/clock";
import ListPostUser from "features/list/list-post-user";
import ListSuggestFriends from "features/list/list-suggest-friends";
import ProfileUser from "features/profile-user";
import Header from "layout/header";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from 'react-redux';
import { getAllPost } from "services/post.svc";
import { getFullName } from "utils/user.utils";

const User = () => {
    const [posts, setPosts] = useState([])
    const user = useSelector(selectCurrenUser)

    const [filter, setFilter] = useState({
        page: 1,
        size: 6
    })

    const [hasMore, setHasMore] = useState(true)
    const elementRef = useRef(null)

    const userName = getFullName(user.first_name, user.last_name)

    const fetchAllPosts = useCallback(async (page, size) => {
        try {
            const allPosts = await getAllPost(
                {
                    page: page,
                    size: size
                })

            if (allPosts.data.posts.length === 0) {
                setHasMore(false)
            } else {
                setPosts((prev) => {
                    if (Array.isArray(prev)) {
                        const newData = [...prev, ...allPosts.data.posts]
                        return newData
                    }
                    else {
                        return [...allPosts.data.posts]
                    }
                })

                setFilter((prev) => ({
                    ...prev,
                    page: prev.page + 1
                }))
            }
        }
        catch (error) {
            console.log("Error: ", error)
        }
    }, [])

    const onIntersection = useCallback((entries) => {
        const firstEntries = entries[0]
        if (firstEntries.isIntersecting && hasMore) {

            fetchAllPosts(
                filter.page,
                filter.size
            )
        }
    }, [filter.page])

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
        <div className='flex gap-1 w-full h-screen overflow-y-scroll'>
            <div className='flex flex-col col-span-3 gap-2 '>
                <div className="w-full h-[80px] flex flex-row items-end gap-1 pt-3">
                    {
                        posts ?
                            <Header />
                            :
                            ''
                    }

                </div>

                <div className="flex flex-col items-center pt-3 gap-3 ">
                    {
                        posts
                            ?
                            <ListPostUser
                                posts={posts} />
                            // <CardPostUserMock />
                            :
                            <Spinner color="default" size="lg" />
                    }

                    {
                        hasMore &&
                        <div className='flex items-center justify-center h-full' ref={elementRef}>
                            <Spinner color="default" />
                        </div>
                    }
                </div>
            </div>

            {
                posts
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
