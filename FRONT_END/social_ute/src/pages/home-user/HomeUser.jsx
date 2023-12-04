import { Tab, Tabs } from "@nextui-org/react";
import Loading from "components/loading";
import ListPostUserDetail from "features/list-post-user-detail";
import ListStoryUserDetail from "features/list-story-user-detail";
import { Book, Grid3X3 } from 'lucide-react';
import { Suspense, lazy, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { statistics } from "services/user.svc";
import { getUserNameFromCookie } from "utils/user.utils";

const HomeUser = () => {
    const HeaderHomeUser = lazy(() => (import('layout/header-home')));
    const [userStatisics, setUserStatisics] = useState()

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

    useEffect(() => {
        fetchUserStatisics()

    }, [fetchUserStatisics])

    return (
        <div className='grid grid-rows-3 p-2 h-screen'>
            <div className='p-4 row-span-1'>
                <Suspense fallback={<Loading />}>
                    <HeaderHomeUser
                        userStatisics={userStatisics?.data ? userStatisics.data : ''}
                        userName={userName}
                        userAvatar='https://i.pravatar.cc/150?u=a042581f4e29026024d'
                    />
                </Suspense>
            </div>

            <div className='grid grid-rows-1 justify-center '>
                <div className="flex w-full flex-col">
                    <Tabs
                        color="default"
                        variant="underlined"
                        classNames={{
                            tabList: "gap-6 w-full relative rounded-none p-0 flex justify-center",
                            cursor: "w-full",
                            tab: "max-w-fit px-0 h-12",
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
                            <ListPostUserDetail posts={[]} />
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
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default HomeUser
