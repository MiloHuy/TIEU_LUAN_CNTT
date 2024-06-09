import CardBaseLayout from "combine/card-base/CardBaseLayout";
import { getFullName } from "utils/user.utils";

const UserCard = ({ item, ...props }) => {
  return (
    <div className="flex justify-center text-sm text-black dark:text-white" {...props}>
      <CardBaseLayout
        align="vertical"
        className="w-full items-center justify-between gap-4 p-2"
        header={
          <img
            src={item.avatar.url}
            className='w-20 h-20 rounded-full object-cover'
            loading='lazy'
            alt='img'
          />
        }

        body={
          <div className="flex flex-col gap-2 h-full justify-center items-start cursor-pointer w-full">
            <p>{getFullName(item.first_name, item.last_name)}</p>

            <p className="uppercase">{item.department}</p>
          </div>
        }
      />
    </div>
  )
}

export default UserCard
