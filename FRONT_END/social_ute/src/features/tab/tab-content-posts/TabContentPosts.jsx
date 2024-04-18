import ModalUploadFile from "features/modal/modal-upload-image-file/ModalUploadFile"

const TabContentPosts = () => {
  return (
    <div className='flex flex-col gap-2 w-full items-center font-quick_sans'>
      <ModalUploadFile
        trigger={
          <div className="w-[30vw] h-20 border-b border-black dark:border-white flex gap-5 items-center justify-center px-4 rounded-lg">
            <img
              src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvde3ZFWQ7OaIsMh1pRWHrKwqHKsIOheWjkrMk4GWcYg&s'
              alt='img_group'
              className='h-10 w-10 rounded-full object-cover'
            />

            <p >Hãy viết cảm nghĩ của bạn...</p>
          </div>
        }
      />
    </div>
  )
}

export default TabContentPosts
