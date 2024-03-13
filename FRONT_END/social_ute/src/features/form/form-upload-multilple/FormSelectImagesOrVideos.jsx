import clsx from "clsx"
import { ImageUpload } from "components/icon/bonus.icon"
import { useMemo } from "react"

const FormSelectImagesOrVideos = ({ className, stepForm, handleNextForm, setFiles }) => {
  const checkStepToNextForm = useMemo(() => {
    switch (stepForm) {
      case 0:
        return 'translate-x-full'
      case 1:
        return '-translate-x-0'
      case 2:
        return `-translate-x-[100vw]`
      case 3:
        return `-translate-x-[100vw]`
      default:
        break
    }
  }, [stepForm])

  const handleInputFile = (e) => {
    const ListFile = e.target.files

    if (ListFile.length > 0) {
      setFiles((prev) => ({
        ...prev,
        files: e.target.files
      }))

      handleNextForm && handleNextForm()
    }
  }

  return (
    <div className={clsx(
      'absolute top-0 right-0 min-h-[45vh] min-w-[40vw] ',
      `${checkStepToNextForm} transform duration-500 ease-in`,
      className)}
    >
      <div className='flex flex-col gap-6 justify-center items-center min-h-[45vh] min-w-[40vw]'>
        <p className='font-quick_sans text-[30px] text-center text-black dark:text-white font-bold'>
          Hãy chọn ảnh hoặc video bạn muốn
        </p>

        <label
          for="post_img"
          className='w-max h-max border flex flex-col items-center justify-center cursor-pointer'
        >
          <ImageUpload
            height='37'
            width='61'
          />

          <input
            multiple
            id="post_img"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleInputFile}
          />
        </label>
      </div>
    </div >
  )
}

export default FormSelectImagesOrVideos
