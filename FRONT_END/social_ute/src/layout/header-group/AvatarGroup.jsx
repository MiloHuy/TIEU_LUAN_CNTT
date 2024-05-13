
const AvatarGroup = ({ avatar }) => {
  return (
    <img
      loading="lazy"
      src={avatar}
      alt='img_group'
      className='w-full h-[30vh]'
    />
  )
}

export default AvatarGroup
