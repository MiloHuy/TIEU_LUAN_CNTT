import AvatarGroup from "./AvatarGroup"
import InfoBaseGroup from "./InfoBaseGroup"

const HeaderGroup = () => {
  return (
    <div className='flex flex-col gap-2 overflow-auto font-quick_sans text-black dark:text-white'>
      <AvatarGroup />

      <InfoBaseGroup />
    </div>
  )
}

export default HeaderGroup
