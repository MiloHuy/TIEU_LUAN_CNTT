import clsx from "clsx"
import { Button } from "components/button"
import CaroselVersion2 from "components/carousel/Carosel-V2"
import { Textarea } from "components/textarea"
import { PostType } from "constants/post.const"
import SelectPrivacyPost from "features/select/select-privacy-post"
import { PrivacyPost } from "features/select/select-privacy-post/SelectPrivacyPost"
import { useFormik } from "formik"
import { Loader2 } from "lucide-react"
import { useCallback, useMemo, useState } from "react"

const FormUploadFinal = ({ className, stepForm, onUpload, images, files }) => {
  const [isLoading, setIsLoading] = useState(false)

  const initFormUpload = {
    post_description: '',
    post_img: '',
    privacy: PrivacyPost.FOLLOWER
  }
  const [formUpload, setFormUpload] = useState(initFormUpload)

  const handleUploadFinal = useCallback(async (values, files, images) => {
    setIsLoading(true)
    onUpload && await onUpload(values, files, images)
    setIsLoading(false)
  }, [onUpload])

  const checkStepToNextForm = useMemo(() => {
    switch (stepForm) {
      case 0:
        return 'translate-x-full'
      case 1:
        return 'translate-x-full'
      case 2:
        return 'translate-x-full'
      case 3:
        return `-translate-x-0`
      default:
        break
    }
  }, [stepForm])

  const handleInput = (e) => {
    setFormUpload({ ...formUpload, [e.target.name]: e.target.value, });
  };

  const formik = useFormik({
    initialValues: formUpload,
    handleChange: { handleInput },
  })

  const { values } = formik

  return (
    <div className={clsx(
      'absolute top-0 right-0 min-h-[80vh] min-w-[55vw]',
      `${checkStepToNextForm} transform duration-500 ease-in`,
      className)}>
      <div className="grid grid-cols-2 max-h-[80vh] min-w-[55vw] overflow-auto">
        <div className='w-full h-full'>
          <CaroselVersion2
            className='min-h-[80vh]'
            slides={images}
            type={PostType.IMAGE_PREVIEW}
          />
        </div>

        <div className='flex flex-col h-full w-full font-quick_sans'>
          <p className=' text-2xl font-bold text-center p-4'>Hoàn thành</p>

          <hr className='border border-black' />

          <div className='grid w-full gap-3 mt-2 p-4'>
            <p className='text-lg font-bold'>Viết mô tả:</p>

            <Textarea
              disabled={isLoading}
              id="post_description"
              name='post_description'
              placeholder="Hãy viết cảm nghĩ của bạn"
              className='border border-black font-quick_sans'
              onChange={formik.handleChange}
            />

            <SelectPrivacyPost
              title='Phạm vi:'
              loading={isLoading}
              values={values['privacy']}
              handleChange={setFormUpload}
            />

            <Button
              onClick={() => handleUploadFinal(values, files, images)}
              disabled={isLoading}
              className='text-xl'
            >
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : ''}

              Đăng bài
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormUploadFinal
