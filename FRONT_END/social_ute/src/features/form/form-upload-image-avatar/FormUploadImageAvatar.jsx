import clsx from "clsx";
import { Button } from "components/button";
import { DialogClose } from "components/dialog";
import { ERR_CHANGE_AVATAR } from "constants/error.const";
import { useFormik } from "formik";
import { Loader2 } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { uploadImageAvatar } from "services/me.svc";
import { errorHandler } from "utils/error-response.utils";
import UploadNote from "./UploadNote";
import schemaFormUploadImageAvatar from "./schema";

const FormUploadImageAvatar = ({ keyName, isReload = true, titleButton, onChangeAvatar, className }) => {
  const [selectFiled, setSelectFiles] = useState('')
  const [image, setImage] = useState()

  const [isLoading, setIsLoading] = useState(false)

  const [formUpload, setFormUpload] = useState({
    [keyName]: ''
  })

  const schema = useMemo(() => schemaFormUploadImageAvatar(keyName), [keyName])

  const formik = useFormik({
    initialValues: formUpload,
    validationSchema: schema,
  })

  const handleInputFile = (e) => {
    const ListFile = e.target.files

    if (ListFile.length > 0) {
      setSelectFiles(e.target.files)

      setImage(URL.createObjectURL(ListFile[0]))
      formik.setFieldValue(keyName, ListFile[0]);
      onChangeAvatar &&
        onChangeAvatar((prev) =>
        ({
          ...prev, [keyName]: { file: ListFile[0], image: URL.createObjectURL(ListFile[0]) }
        }))
    }
  }

  const handleUploadImage = async (e) => {
    e.preventDefault()

    try {
      setIsLoading(true)
      values[keyName] = selectFiled[0]

      const formData = new FormData()
      formData.append(keyName, values[keyName])

      await uploadImageAvatar(formData)

      setIsLoading(false)

      toast.success('Thay đổi thành công!!!', {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      isReload && setTimeout(() => { window.location.reload(); URL.revokeObjectURL() }, 1500)
    }
    catch (err) {
      setIsLoading(false)

      errorHandler(err, ERR_CHANGE_AVATAR)
    }
  }

  formik.handleChange = handleInputFile
  formik.handleSubmit = handleUploadImage

  const { values, errors } = formik

  const clsLabelError = useMemo(
    () => errors[keyName] ?
      'rounded-lg border-2 border-red border-dashed' :
      'rounded-lg border-2 border-black border-dashed cursor-pointer',
    [errors, keyName])

  const renderImage = useMemo(() => {
    if (image) {
      return (
        <img
          loading="lazy"
          src={image}
          alt='img'
          className="h-full w-full"
        />
      )
    }

    return (
      <input
        id={keyName}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={formik.handleChange}
      />
    )
  }, [image, keyName, formik.handleChange])

  return (
    <form
      onSubmit={(e) => handleUploadImage(e)}
      className={clsx('min-h-[300px] h-max w-full gap-2 flex flex-col items-center', className)}
    >
      <label
        for={keyName}
        className={`flex-1 flex-col w-full h-full` + clsLabelError}>

        {errors[keyName] && <p className='text-red text-sm'>{errors[keyName]}</p>}

        {!image && <UploadNote />}

        {renderImage}
      </label>

      {
        onChangeAvatar
          ?
          <DialogClose asChild>
            <Button
              variant='outline'
              radius="sm"
              className='text-lg font-quick_sans w-1/2'>
              {titleButton ? titleButton : 'Thay đổi'}
            </Button>
          </DialogClose>
          :
          <Button
            variant='outline'
            type="submit"
            radius="sm"
            className='text-lg font-quick_sans w-1/2'>
            {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            {titleButton ? titleButton : 'Thay đổi'}
          </Button>
      }
    </form>
  )
}

export default FormUploadImageAvatar
