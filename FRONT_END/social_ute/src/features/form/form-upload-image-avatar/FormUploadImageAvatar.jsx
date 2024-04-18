import { Button } from "components/button";
import { ERR_CHANGE_AVATAR } from "constants/error.const";
import { useFormik } from "formik";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { uploadImageAvatar } from "services/me.svc";
import { checkCodeInArray } from "utils/code-error.utils";
import UploadNote from "./UploadNote";

const FormUploadImageAvatar = ({ keyName, isReload = true, schema, titleButton, onChangeAvatar }) => {
  const [selectFiled, setSelectFiles] = useState('')
  const [image, setImage] = useState()

  const [isLoading, setIsLoading] = useState(false)

  const [formUpload, setFormUpload] = useState({
    [keyName]: ''
  })

  const handleInput = (e) => {
    setFormUpload({ ...formUpload, [e.target.name]: e.target.value })
  }

  const handleInputFile = (e) => {
    const ListFile = e.target.files

    if (ListFile.length > 0) {
      setSelectFiles(e.target.files)

      setImage(URL.createObjectURL(ListFile[0]))
      onChangeAvatar && onChangeAvatar((prev) => ({ ...prev, [keyName]: ListFile[0] }))
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

      isReload && setTimeout(() => { window.location.reload() }, 1500)
    }
    catch (err) {
      setIsLoading(false)

      const { code } = err.response.data

      const messageError = checkCodeInArray(ERR_CHANGE_AVATAR, code)

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
  }

  const formik = useFormik({
    initialValues: formUpload,
    handleChange: { handleInput },
    validateSchema: schema,
    handleSubmit: { handleUploadImage }
  })

  const { values, errors } = formik

  return (
    <form onSubmit={(e) => handleUploadImage(e)} className='h-full gap-2 flex flex-col items-center justify-between'>
      <div className="flex items-center justify-between w-full h-full">
        {
          image ?
            <label
              for={keyName}
              className="flex flex-col items-center justify-center w-full h-80">

              <img
                loading="lazy"
                src={image}
                alt='img'
                className="h-full w-full"
              />
            </label>
            :
            <label
              for={keyName}
              className="flex flex-col items-center justify-center w-full h-80 rounded-lg border-2 border-black border-dashed cursor-pointer">

              <UploadNote />

              <input
                id={keyName}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleInputFile}
              />
            </label>
        }
      </div>

      {
        onChangeAvatar
          ? null
          :
          <Button
            variant='outline'
            type="submit"
            radius="sm"
            className='text-lg font-quick_sans w-1/2'>
            {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            {titleButton ? titleButton : 'Thay đổi'}
          </Button>}
    </form>
  )
}

export default FormUploadImageAvatar
