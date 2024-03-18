import clsx from "clsx"
import { Button } from "components/button"
import { useCallback, useEffect, useMemo, useState } from "react"
import { handleConvertFileToUrlImage } from "utils/file.utils"

const FormPreview = ({ className, stepForm, handleNextForm, files, setFilesAndImages }) => {
  const [images, setImage] = useState([])
  const [indexImg, setIndexImg] = useState(0)

  const checkStepToNextForm = useMemo(() => {
    switch (stepForm) {
      case 0:
        return 'translate-x-full'
      case 1:
        return 'translate-x-full'
      case 2:
        return `-translate-x-0`
      case 3:
        return '-translate-x-full'
      default:
        break
    }
  }, [stepForm])

  const handlePreviewFiles = useCallback(() => {
    const arrImage = handleConvertFileToUrlImage(files)
    setImage(arrImage)

    setFilesAndImages && setFilesAndImages((prev) => ({
      ...prev,
      images: arrImage
    }))
  }, [files, setFilesAndImages])

  useEffect(() => {
    handlePreviewFiles()
  }, [handlePreviewFiles])

  return (
    <div className={clsx(
      'absolute top-0 right-0 min-h-[80vh] min-w-[55vw] ',
      `${checkStepToNextForm} transform duration-500 ease-in`,
      className)}
    >
      {
        images && images.length !== 0
          ?
          <div className='grid grid-cols-2 max-h-[80vh] min-w-[55vw] font-quick_sans overflow-auto'>
            <div className='h-auto w-full grid gap-3'>
              <img
                src={images[indexImg]}
                alt='img'
                className='object-fit h-[80vh] max-h-[80vh] w-[30vw]'
              />

              <hr className='border border-black' />

              <div className='w-full flex flex-col items-center gap-3'>
                <p className='font-quick_sans text-md font-bold'>
                  Bạn đã chọn : {images.length} ảnh
                </p>

                <Button
                  onClick={handleNextForm}
                  className='w-3/4'>
                  Tiếp theo
                </Button>
              </div>
            </div>

            <div className='flex flex-col h-full w-full'>
              <p className='text-2xl font-bold text-center p-4'>Xem trước</p>

              <hr className='border border-black' />

              <div className='grid grid-cols-2 p-4 gap-3 w-full'>
                {
                  images.map((image, i) => {
                    return (
                      <div className='w-full min-h-[30vh] grid gap-2'>
                        <img
                          loading="lazy"
                          src={image}
                          alt='img'
                          className='object-fit rounded-lg cursor-pointer h-[30vh] w-full'
                          onClick={() => setIndexImg(i)}
                        />

                        <p className='text-sm font-bold text-center'>Ảnh {i}</p>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
          : ''
      }
    </div >
  )
}

export default FormPreview
