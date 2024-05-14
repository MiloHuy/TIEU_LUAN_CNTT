import clsx from "clsx"
import { Button } from "components/button"
import { useNavigate } from "react-router-dom"

const CardGroupAttended = ({ groupInfo }) => {
  const navigate = useNavigate()

  return (
    <div className={clsx(
      "w-[350px] h-[60vh] flex flex-col overflow-hidden",
      "rounded-lg border border-black/15 dark:border-white",
      "font-quick_sans text-black dark:text-white text-lg"
    )}>
      <img
        alt='bg-group'
        src={groupInfo.avatar.url}
        className="h-[45vh] w-full object-cover"
      />

      <div className="grid grid-cols-1 items-start justify-center h-[15vh]">
        <p className="font-bold text-center hover:underline">
          {groupInfo.name}
        </p>

        <div className='flex gap-5 mb-2 justify-around'>
          <Button variant='destructive' className='p-5'>
            Rời nhóm
          </Button>

          <Button className='p-5' onClick={() => navigate(`/welcome/groupDetails/${groupInfo._id}`)}>
            Xem nhóm
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CardGroupAttended
