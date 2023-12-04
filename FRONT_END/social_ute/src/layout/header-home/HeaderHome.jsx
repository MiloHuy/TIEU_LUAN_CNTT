import { Divider } from "@nextui-org/react";

const HeaderHome = (props) => {
    const { userStatisics, userInfo, userName, userAvatar } = props
    const {
        count_followers,
        count_followings,
        count_posts,
        count_friends,
        count_stories, } = userStatisics

    const avatar_URL = userInfo?.user?.avatar.url

    console.log("userName: " + userName)

    return (
        <div className="grid grid-rows-2 ">
            <div className='grid grid-cols-7 gap-2'>
                <div className='col-span-2 justify-center flex'>
                    <img
                        loading='lazy'
                        alt='avatar'
                        // src='https://i.pravatar.cc/150?u=a04258114e29026302d'
                        src={userAvatar ? userAvatar : avatar_URL}
                        className='rounded-full w-1/2'
                    />
                </div>

                <div className="col-span-5">
                    <div className='grid grid-rows-2 gap-3'>
                        <div>
                            <p className='dark:text-white font-noto'>
                                {userName}
                            </p>
                        </div>

                        <div className="flex flex-row gap-7">
                            <div className="flex gap-1">
                                <p className="dark:text-white font-noto">{count_posts}</p>
                                <p className="dark:text-white font-noto">Bài viết</p>
                            </div>

                            <div className="flex gap-1">
                                <p className="dark:text-white font-noto">{count_followers}</p>
                                <p className="dark:text-white font-noto">người theo dõi</p>
                            </div>

                            <div className="flex gap-1">
                                <p className="dark:text-white font-noto">Đang theo dõi:</p>
                                <p className="dark:text-white font-noto">{`${count_followings || 0} người dùng`}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center h-0">
                <Divider orientation='horizontal' className="my-4 w-4/5" />
            </div>
        </div>
    )
}

export default HeaderHome
