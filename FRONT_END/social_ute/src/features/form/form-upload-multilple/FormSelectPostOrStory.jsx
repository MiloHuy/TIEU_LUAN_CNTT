import clsx from "clsx";
import { Button } from "components/button";
import { ImageIcon, VideoIcon } from "components/icon/bonus.icon";
import { Camera } from 'lucide-react';
import { useMemo } from "react";

const FormSelectPostOrStory = ({ className, stepForm, handleNextForm }) => {
  const checkStepToNextForm = useMemo(() => {
    switch (stepForm) {
      case 0:
        return ''
      case 1:
        return '-translate-x-full'
      case 2:
        return `-translate-x-[100vw]`
      case 3:
        return `-translate-x-[100vw]`
      default:
        break
    }
  }, [stepForm])

  return (
    <div className={
      clsx(
        'absolute top-0 right-0 min-h-[45vh] min-w-[50vw] ',
        `${checkStepToNextForm} transform duration-500 ease-in`,
        className
      )
    }>
      <div className="flex flex-col h-full justify-center gap-4 min-h-[45vh] min-w-[40vw] ">
        <p className='font-quick_sans text-[30px] text-center text-black dark:text-white font-bold h-max'>
          Bạn muốn đăng tải điều gì?
        </p>

        <div className='w-full flex gap-3 items-center justify-around'>
          <Button
            className='min-w-[180px] min-h-[90px]'
            variant='press'
            onClick={() => handleNextForm()}
          >
            <p className='font-quick_sans text-[20px] text-center text-black dark:text-white font-bold'>
              Bài viết
            </p>
            <div className='flex items-center justify-center w-full'>
              <ImageIcon
                height='25'
                width='25'
              />

              <VideoIcon
                height='25'
                width='25'
              />
            </div>
          </Button>

          <Button
            className='min-w-[180px] min-h-[90px]'
            variant='press'
            onClick={() => handleNextForm()}
          >
            <p className='font-quick_sans text-[20px] text-center text-black dark:text-white font-bold'>
              Tin
            </p>
            <Camera strokeWidth={0.75} />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default FormSelectPostOrStory
