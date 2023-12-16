import { Spinner, Tab, Tabs } from "@nextui-org/react";
import Loading from "components/loading";
import SearchBlockDebounce from "components/search-block-debounce";
import ListFriendsUser from "features/list/list-friends-user";
import ListPostUserDetail from 'features/list/list-post-user-detail';
import ListStoryUserDetail from 'features/list/list-story-user-detail';
import HeaderHome from "layout/header-home";
import { Book, Bookmark, Grid3X3, Users } from 'lucide-react';
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllMePosts, getListFriends } from "services/me.svc";
import { getPostSaved } from "services/post.svc";
import { getAllStory } from "services/story.svc";
import { statistics } from "services/user.svc";
import { getUserNameFromCookie } from "utils/user.utils";

const HomeUser = () => {
    const [selected, setSelected] = useState("posts");

    const { userId } = useParams()
    const userName = getUserNameFromCookie()

    const initHomeUser = {
        userStatisics: '',
        mePosts: '',
        stories: '',
        friends: '',
        postSaved: ''
    }

    const [homeUser, setHomeUser] = useState(initHomeUser)

    const fetchUserStatisics = useCallback(async () => {
        try {
            const data = await statistics(userId)
            setHomeUser((prev) => ({
                ...prev,
                userStatisics: { ...data }
            }))
        }
        catch (error) {
            console.log("Error: ", error)
        }
    }, [userId])

    const fetchMePosts = useCallback(async () => {
        try {
            const dataPosts = await getAllMePosts()
            setHomeUser((prev) => ({
                ...prev,
                mePosts: { ...dataPosts }
            }))
        }
        catch (error) {
            console.log("Error: ", error)
        }
    }, [])

    const fetchMeStories = useCallback(async () => {
        try {
            const dataStories = await getAllStory()
            setHomeUser((prev) => ({
                ...prev,
                stories: { ...dataStories }
            }))
        }
        catch (error) {
            console.log("Error: ", error)
        }
    }, [])

    const fetchMeFriends = useCallback(async () => {
        try {
            const dataFriends = await getListFriends()
            setHomeUser((prev) => ({
                ...prev,
                friends: { ...dataFriends }
            }))
        }
        catch (error) {
            console.log("Error: ", error)
        }
    }, [])

    const fetchMePostSaved = useCallback(async () => {
        try {
            const dataPostSaved = await getPostSaved()
            setHomeUser((prev) => ({
                ...prev,
                postSaved: { ...dataPostSaved }
            }))
        }
        catch (error) {
            console.log("Error: ", error)
        }
    }, [])

    useEffect(() => {
        // fetchUserStatisics()

        // if (selected === 'posts') {
        //     fetchMePosts()
        // }

        // if (selected === 'story') {
        //     fetchMeStories()
        // }

        // if (selected === 'friends') {
        //     fetchMeFriends()
        // }
        fetchUserStatisics()

        switch (selected) {
            case 'posts':
                fetchMePosts()
                break
            case 'story':
                fetchMeStories()
                break
            case 'friends':
                fetchMeFriends()
                break
            case 'postsSaved':
                fetchMePostSaved()
                break
            default:
                return
        }
    }, [fetchUserStatisics, selected])

    return (
        homeUser.userStatisics
            ?
            <div className='grid grid-rows-3 p-2 h-screen overflow-auto '>
                <div className='p-4 row-span-1'>
                    <HeaderHome
                        userStatisics={homeUser.userStatisics.data}
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
                                        <span className="dark:text-white font-mono">Posts</span>
                                    </div>
                                }
                            >
                                {
                                    homeUser.mePosts ?
                                        <ListPostUserDetail
                                            userName={userName}
                                            posts={homeUser.mePosts.data} />
                                        :
                                        <Spinner color="default" size="lg" />
                                }
                            </Tab>

                            <Tab
                                key="story"
                                title={
                                    <div className="flex items-center space-x-2">
                                        <Book size={20} />
                                        <span className="dark:text-white font-mono">Story</span>
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
                                        <span className="dark:text-white font-mono">Friends</span>
                                    </div>
                                }
                            >
                                {
                                    homeUser.friends ?
                                        <div className="grid grid-cols-1 w-full gap-3">
                                            <div className="w-full flex justify-end ">
                                                <SearchBlockDebounce
                                                    className='w-1/3 '
                                                />
                                            </div>

                                            <ListFriendsUser friends={homeUser.friends.data} />
                                        </div>
                                        :
                                        <div className='w-full h-full flex items-center justify-center'>
                                            <Spinner color="default" size="lg" />
                                        </div >
                                }
                            </Tab>

                            <Tab
                                key="postsSaved"
                                title={
                                    <div className="flex items-center space-x-2">
                                        <Bookmark
                                            size={20}
                                            strokeWidth={1.5}
                                        />
                                        <span className="dark:text-white text-black font-mono">Post Saved</span>
                                    </div>
                                }
                            >
                                {
                                    homeUser.postSaved ?
                                        <ListPostUserDetail
                                            userName={userName}
                                            posts={homeUser.postSaved.data}
                                        />
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
