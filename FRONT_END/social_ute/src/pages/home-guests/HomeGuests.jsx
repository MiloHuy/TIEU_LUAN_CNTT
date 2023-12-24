import { Spinner, Tab, Tabs } from "@nextui-org/react";
import PropagateLoader from "components/propagate-loading/PropagateLoader";
import ListPostUserDetail from "features/list/list-post-user-detail";
import HeaderHome from "layout/header-home";
import { Grid3X3 } from 'lucide-react';
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { getAllPostsGuest, getUserInfo, statistics } from "services/user.svc";
import { getFullName } from "utils/user.utils";

const HomeGuests = () => {
    const [userStatisics, setUserStatisics] = useState()
    const [userInfo, setUserInfo] = useState()
    const [selected, setSelected] = useState("posts");
    const [posts, setPosts] = useState()
    const { guestId } = useParams()
    const dispatch = useDispatch()
    const userName = getFullName(userInfo?.data.user?.first_name, userInfo?.data.user?.last_name)

    const fetchUserStatisics = useCallback(async () => {
        try {
            const data_statistics = await statistics(guestId)
            setUserStatisics(data_statistics)
        }
        catch (error) {
            console.log("Error: ", error)
        }
    }, [guestId])

    const fetchUserInfo = useCallback(async () => {
        try {
            const data_info = await getUserInfo(guestId)
            setUserInfo(data_info)
            dispatch(data_info.data)
        }
        catch (error) {
            console.log("Error: ", error)
        }
    }, [guestId])

    const fetchPosts = async () => {
        try {
            const posts = await getAllPostsGuest(guestId)
            setPosts([...posts.data.posts])
        }
        catch (error) {
            console.log("Error: ", error)
        }
    }

    useEffect(() => {
        fetchUserStatisics()

        fetchUserInfo()

        if (selected === 'posts') {
            fetchPosts()
        }

    }, [fetchUserStatisics, fetchUserInfo])

    return (
        userStatisics ?
            <div className='grid grid-rows-3 p-2 h-screen overflow-auto'>
                <div className='p-4 row-span-1'>
                    {
                        userInfo ?
                            <HeaderHome
                                userStatisics={userStatisics.data}
                                userInfo={userInfo.data}
                                userName={userName}
                            />
                            : <Spinner color="default" size="lg" />
                    }
                </div>

                <div className='grid grid-rows-1 justify-center '>
                    <div className="flex w-full flex-col">
                        <Tabs
                            color="default"
                            variant="light"
                            selectedKey={selected}
                            onSelectionChange={setSelected}
                            classNames={{
                                tabList: "gap-6 w-full relative rounded-none p-0 flex justify-center",
                                cursor: "w-full",
                                tab: "max-w-[200px] w-[200px] px-0 h-12",
                            }}
                        >
                            <Tab
                                key="posts"
                                title={
                                    <div className="flex items-center space-x-2">
                                        <Grid3X3 size={20} />
                                        <span className="dark:text-white font-mono">Posts</span>
                                    </div>
                                }
                            >
                                {
                                    posts ?
                                        <ListPostUserDetail
                                            posts={posts}
                                            userName={userName}
                                        />
                                        :
                                        <Spinner color="default" size="lg" />
                                }
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
            :
            <div className='grid grid-rows-3 p-2 h-screen overflow-auto  justify-center items-center'>
                <PropagateLoader
                    color="#9aa19f"
                    size={18}
                />
            </div>
    )
}

export default HomeGuests
