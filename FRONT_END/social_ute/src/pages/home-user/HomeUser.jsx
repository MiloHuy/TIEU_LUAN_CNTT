import { Spinner, Tab, Tabs } from "@nextui-org/react";
import Loading from "components/loading";
import ListFriendsUser from "features/list-friends-user";
import ListPostUserDetail from "features/list-post-user-detail";
import ListStoryUserDetail from "features/list-story-user-detail";
import HeaderHome from "layout/header-home";
import { Book, Grid3X3, Users } from 'lucide-react';
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllMePosts, getListFriends } from "services/me.svc";
import { getAllStory } from "services/story.svc";
import { statistics } from "services/user.svc";
import { getUserNameFromCookie } from "utils/user.utils";

const HomeUser = () => {
    const [userStatisics, setUserStatisics] = useState()
    const [mePosts, setMePosts] = useState()
    const [selected, setSelected] = useState("posts");
    const [stories, setStory] = useState()
    const [friends, setFriends] = useState()

    const { userId } = useParams()
    const userName = getUserNameFromCookie()

    const fetchUserStatisics = useCallback(async () => {
        try {
            const data = await statistics(userId)
            setUserStatisics(data)
        }
        catch (error) {
            console.log("Error: ", error)
        }
    }, [userId])

    const fetchMePosts = useCallback(async () => {
        try {
            const dataPosts = await getAllMePosts()
            setMePosts(dataPosts)
        }
        catch (error) {
            console.log("Error: ", error)
        }
    }, [setMePosts])

    const fetchMeStories = useCallback(async () => {
        try {
            const dataStories = await getAllStory()
            setStory(dataStories)
        }
        catch (error) {
            console.log("Error: ", error)
        }
    }, [setStory])

    const fetchMeFriends = useCallback(async () => {
        try {
            const dataFriends = await getListFriends()
            setFriends(dataFriends)
        }
        catch (error) {
            console.log("Error: ", error)
        }
    }, [setFriends])

    useEffect(() => {
        fetchUserStatisics()

        if (selected === 'posts') {
            fetchMePosts()
        }

        if (selected === 'story') {
            fetchMeStories()
        }

        if (selected === 'friends') {
            fetchMeFriends()
        }

    }, [fetchUserStatisics, selected])

    return (
        userStatisics
            ?
            <div className='grid grid-rows-3 p-2 h-screen overflow-auto '>
                <div className='p-4 row-span-1'>
                    <HeaderHome
                        userStatisics={userStatisics.data}
                        userName={userName}
                        userAvatar='https://i.pravatar.cc/150?u=a042581f4e29026024d'
                    />
                </div>

                <div className='grid grid-rows-1 justify-center w-full h-screen'>
                    <div className="flex w-full flex-col">
                        <Tabs
                            color="default"
                            variant="light"
                            radius='md'
                            selectedKey={selected}
                            onSelectionChange={setSelected}
                            classNames={{
                                tabList: "gap-6 w-full relative rounded-none flex justify-center",
                                cursor: "w-full",
                                tab: "max-w-[200px] w-[150px] px-0 h-12",
                            }}
                        >
                            <Tab
                                key="posts"
                                title={
                                    <div className="flex items-center space-x-2">
                                        <Grid3X3 size={20} />
                                        <span className="dark:text-white font-noto">Posts</span>
                                    </div>
                                }
                            >
                                {
                                    mePosts ?
                                        <ListPostUserDetail
                                            userName={userName}
                                            posts={mePosts} />
                                        :
                                        <Spinner color="default" size="lg" />
                                }
                            </Tab>

                            <Tab
                                key="story"
                                title={
                                    <div className="flex items-center space-x-2">
                                        <Book size={20} />
                                        <span className="dark:text-white font-noto">Story</span>
                                    </div>
                                }
                            >
                                <ListStoryUserDetail stories={[]} />
                            </Tab>

                            <Tab
                                key="friends"
                                title={
                                    <div className="flex items-center space-x-2">
                                        <Users size={20} />
                                        <span className="dark:text-white font-noto">Friends</span>
                                    </div>
                                }
                            >
                                {
                                    friends ?
                                        <ListFriendsUser friends={friends.data} />
                                        :
                                        <div className='w-full h-full flex items-center justify-center'>
                                            <Spinner color="default" size="lg" />
                                        </div >
                                }
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
            :
            <Loading />

    )
}

export default HomeUser
