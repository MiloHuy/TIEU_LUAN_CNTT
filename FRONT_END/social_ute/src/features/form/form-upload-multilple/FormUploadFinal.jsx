import clsx from "clsx"
import { Button } from "components/button"
import CaroselVersion2 from "components/carousel/Carosel-V2"
import { Textarea } from "components/textarea"
import { ERROR_SYSTEM, ERR_CREATE_POST } from "constants/error.const"
import { PostType } from "constants/post.const"
import SelectPrivacyPost from "features/select/select-privacy-post"
import { PrivacyPost } from "features/select/select-privacy-post/SelectPrivacyPost"
import { useFormik } from "formik"
import { Loader2 } from "lucide-react"
import { useMemo, useState } from "react"
import { toast } from "react-toastify"
import { createPost } from "services/post/api-post.svc"
import { checkCodeInArray } from "utils/code-error.utils"
import { handleRevokeBlobUrl } from "utils/file.utils"

const FormUploadFinal = ({ className, stepForm, files, images }) => {
  const [loading, setIsLoading] = useState(false)

  const initFormUpload = {
    post_description: '',
    post_img: '',
    privacy: PrivacyPost.FOLLOWER
  }
  const [formUpload, setFormUpload] = useState(initFormUpload)

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

  const handleCreatePost = async () => {
    try {
      setIsLoading(true)

      const formData = new FormData()
      formData.append('post_description', values['post_description'])
      for (const file of files) {
        formData.append('post_img', file)
      }
      formData.append('privacy', formUpload['privacy'])

      await createPost(formData)
      setIsLoading(false)

      toast.success('Đăng bài viết thành công!!!', {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      handleRevokeBlobUrl(images)
      setTimeout(() => { window.location.reload() }, 1500)
    }
    catch (err) {
      setIsLoading(false)

      if (err && err.response && err.response.data) {
        const { code } = err.response.data

        const messageError = checkCodeInArray(ERR_CREATE_POST, code)

        toast.error(messageError, {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      else {
        toast.error(ERROR_SYSTEM, {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

    }
  }

  const formik = useFormik({
    initialValues: formUpload,
    handleChange: { handleInput },
    handleSubmit: { handleCreatePost }
  })

  const { values, errors, } = formik

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
              disabled={loading}
              id="post_description"
              name='post_description'
              placeholder="Hãy viết cảm nghĩ của bạn"
              className='border border-black font-quick_sans'
              onChange={formik.handleChange}
            />

            <div className='flex gap-3 w-full justify-between items-center min-w-[50px]:flex-col'>
              <SelectPrivacyPost
                title='Phạm vi:'
                loading={loading}
                values={values['privacy']}
                handleChange={setFormUpload}
              />
            </div>

            <Button
              onClick={handleCreatePost}
              disabled={loading}
              className='text-xl'
            >
              {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : ''}

              Đăng bài
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormUploadFinal
