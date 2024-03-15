import clsx from "clsx";
import AvatarComponent from "components/avatar";

const FieldAvatarNameTimeDes = ({ imgAvatar, fullName, className, postDescription }) => {
  return (
    <div className={clsx('w-full h-[10vh] flex items-start gap-2 overflow-auto', className)}>
      <AvatarComponent.Avatar>
        <AvatarComponent.AvatarImage src={imgAvatar} />
        <AvatarComponent.AvatarFallback>Img</AvatarComponent.AvatarFallback>
      </AvatarComponent.Avatar>

      <div className='grid text-sm text-black dark:text-white font-quick_sans'>
        <div className='flex gap-2'>
          <p className="font-bold hover:underline cursor-pointer">
            {fullName}:
          </p>
          <p>{postDescription}</p>
        </div>

        <p>3 ngày</p>
      </div>
    </div>
  )
}

export default FieldAvatarNameTimeDes
