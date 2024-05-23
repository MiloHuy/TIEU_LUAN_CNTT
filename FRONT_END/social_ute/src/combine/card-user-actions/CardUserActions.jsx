import clsx from "clsx";
import { useNavigate } from 'react-router-dom';
import { getFullName } from "utils/user.utils";

const CardUserActions = ({ className, action, userInfo }) => {
  const navigate = useNavigate()

  const handleNavigateFriend = (id) => {
    navigate(`/welcome/home-guest/${id}`)
  }

  return (
    <div className={clsx(
      "min-w-[200px] min-h-[100px] p-2 overflow-hidden",
      "border border-black/50 rounded-lg font-bold font-quick_sans",
      "dark:border dark:border-white ",
      className)}>
      <div className='flex gap-2 items-center justify-between'>
        <div className='flex gap-2 items-center'>
          <img
            loading="lazy"
            src={userInfo.avatar.url ? userInfo.avatar.url : 'https://github.com/shadcn.png'}
            alt='img'
            className='rounded-md object-cover'
            width='80' height='50'
          />

          <div
            onClick={() => handleNavigateFriend(userInfo._id)}
            className="flex flex-col gap-2 h-full justify-center cursor-pointer ">
            <p className="text-sm text-black dark:text-white">
              {getFullName(userInfo.first_name, userInfo.last_name)}
            </p>

            <p className="text-sm text-black dark:text-white uppercase">
              {userInfo.department}
            </p>
          </div>
        </div>

        {action ? action : null}
      </div>
    </div>
  )
}

export default CardUserActions
