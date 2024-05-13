import AvatarGroup from "./AvatarGroup"
import InfoBaseGroup from "./InfoBaseGroup"

const HeaderGroup = ({ avatar, info }) => {
  return (
    <div className='flex flex-col gap-2 font-quick_sans text-black dark:text-white'>
      <AvatarGroup avatar={avatar} />

      <InfoBaseGroup info={info} />
    </div>
  )
}

export default HeaderGroup
