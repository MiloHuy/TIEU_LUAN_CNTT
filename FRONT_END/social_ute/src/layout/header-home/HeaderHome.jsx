import { selectCurrenUser } from "app/slice/auth/auth.slice";
import clsx from "clsx";
import LoadingComponent from "combine/loading-component";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "components/dropdown";
import { TYPELOADING } from "constants/type.const";
import ModalChangeAvatarV2 from "features/modal/modal-change-avatar/ModalChangeAvatarV2";
import { useSelector } from 'react-redux';
import ActionHeaderMe from "./ActionHeaderMe";
import ActionsHeaderGuest from "./ActionsHeaderGuest";

const HeaderHome = (props) => {
  const { userStatisics, userGuestInfo, userName, userAvatar } = props
  const {
    count_followers,
    count_followings,
    count_posts,
    count_friends,
    count_stories
  } = userStatisics

  const user = useSelector(selectCurrenUser)

  return (
    <div className={clsx(
      'grid lg:grid-cols-7 gap-2 items-center p-4 h-max md:grid-cols-1 md:justify-center',
      'border-b border-t border-black/30 rounded-lg',
      'dark:border-white'
    )}>
      <div className='lg:col-span-2 justify-center flex '>
        {
          userAvatar
            ?
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className='w-full flex justify-center'>
                  <img
                    loading='lazy'
                    alt='avatar'
                    src={user.avatar.url}
                    className='cursor-pointer rounded-full w-1/2'
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='text-sm font-quick_san'>
                <ModalChangeAvatarV2
                  title='Thay đổi ảnh đại diện'
                  trigger={
                    <DropdownMenuItem className='flex gap-2' onSelect={(e) => e.preventDefault()}>
                      <p>Đổi ảnh đại diện</p>
                    </DropdownMenuItem>
                  }
                />
              </DropdownMenuContent>
            </DropdownMenu>
            :
            <img
              loading='lazy'
              alt='avatar'
              src={userGuestInfo?.user.avatar.url}
              className='rounded-full w-1/2'
            />
        }
      </div>

      <div className="lg:col-span-5 text-lg">
        <div className='flex flex-col gap-6'>
          <div className="flex gap-2 w-full items-center lg:justify-start md:justify-center">
            <p className='dark:text-white text-black font-quick_sans text-center'>
              {userName}
            </p>

            <LoadingComponent
              type={TYPELOADING.NULL}
              condition={userAvatar}
            >
              <ActionHeaderMe />
            </LoadingComponent>

            <LoadingComponent
              type={TYPELOADING.NULL}
              condition={userGuestInfo && userGuestInfo.user.avatar.url}
            >
              <ActionsHeaderGuest userGuestInfo={userGuestInfo} />
            </LoadingComponent>
          </div>

          <div className="flex justify-between dark:text-white font-quick_sans text-black h-full ">
            <div className="flex gap-1">
              <h1>{count_posts}</h1>
              <h1>Bài viết</h1>
            </div>

            <div className="flex gap-1">
              <h1>{count_followers}</h1>
              <h1>người dùng theo dõi</h1>
            </div>

            <div className="flex gap-1">
              <h1>Đang theo dõi:</h1>
              <h1>{`${count_followings || 0} người dùng`}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderHome
