import { selectCurrenUser } from "app/slice/auth/auth.slice"
import clsx from "clsx"
import ListPostGroup from "features/list/list-post-group"
import ModalUploadFile from "features/modal/modal-upload-image-file/ModalUploadFile"
import { useSelector } from "react-redux"

const TabContentPosts = () => {
  const user = useSelector(selectCurrenUser)

  return (
    <div className='flex flex-col gap-2 w-full items-center font-quick_sans'>
      <ModalUploadFile
        trigger={
          <div className={clsx(
            "w-[350px] h-20 flex gap-5 items-center justify-center overflow-hidden cursor-pointer",
            "border-b border-black dark:border-white rounded-lg")}>
            <img
              src={user.avatar.url}
              alt='img_group'
              className='h-12 w-12 rounded-full object-cover'
            />

            <p >Hãy viết cảm nghĩ của bạn...</p>
          </div>
        }
      />

      <ListPostGroup />
    </div>
  )
}

export default TabContentPosts
