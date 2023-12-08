import { Tab, Tabs } from "@nextui-org/react";
import Loading from "components/loading";
import ListPostUserDetail from "features/list-post-user-detail";
import ListStoryUserDetail from "features/list-story-user-detail";
import { Book, Grid3X3 } from 'lucide-react';
import { Suspense, lazy, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserInfo, statistics } from "services/user.svc";
import { getFullName } from "utils/user.utils";
const HeaderHome = lazy(() => (import('layout/header-home')));

const HomeGuests = () => {
    const [userStatisics, setUserStatisics] = useState()
    const [userInfo, setUserInfo] = useState()
    const { guestId } = useParams()
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
        }
        catch (error) {
            console.log("Error: ", error)
        }
    }, [])

    useEffect(() => {
        fetchUserStatisics()

        fetchUserInfo()

    }, [fetchUserStatisics, fetchUserInfo])

    return (
        userStatisics ?
            <div className='grid grid-rows-3 p-2 h-screen'>
                <div className='p-4 row-span-1'>
                    <Suspense fallback={<Loading />}>
                        <HeaderHome
                            userStatisics={userStatisics.data}
                            userInfo={userInfo.data}
                            userName={userName}
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
            :
            <Loading />
    )
}

export default HomeGuests