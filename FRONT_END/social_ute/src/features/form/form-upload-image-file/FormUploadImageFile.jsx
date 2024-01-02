import { Button, Input } from "@nextui-org/react";
import { ERR_CREATE_POST } from "constants/error.const";
import { useFormik } from "formik";
import { Camera } from 'lucide-react';
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createPost } from "services/post.svc";
import { checkCodeInArray } from "utils/code-error.utils";


const FormUploadImageFile = () => {
    const [selectFiled, setSelectFiles] = useState('')

    const [image, setImage] = useState()

    const [isLoading, setIsLoading] = useState(false)

    const initFormUpload = {
        post_description: '',
        post_img: ''
    }
    const [formUpload, setFormUpload] = useState(initFormUpload)

    const handleInput = (e) => {
        setFormUpload({ ...formUpload, [e.target.name]: e.target.value })
    }

    const handleInputFile = (e) => {
        const ListFile = e.target.files

        if (ListFile.length > 0) {
            setSelectFiles(e.target.files)

            setImage(URL.createObjectURL(ListFile[0]))
        }
    }

    const handleCreatePost = async () => {
        try {
            setIsLoading(true)
            values['post_img'] = selectFiled[0]

            const formData = new FormData()
            formData.append('post_description', values['post_description'])
            formData.append('post_img', values['post_img'])

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

            setTimeout(() => { window.location.reload() }, 1500)
        }
        catch (err) {
            setIsLoading(false)

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
    }

    const formik = useFormik({
        initialValues: formUpload,
        handleChange: { handleInput },
        handleSubmit: { handleCreatePost }
    })

    const { values, errors } = formik

    return (
        <form className='h-full gap-2 justify-start flex flex-col items-center'>
            <Input
                name='post_description'
                type='text'
                variant='bordered'
                className=' text-sm rounded-sm w-full placeholder:text-black text-white'
                placeholder='Hãy nói cảm nghĩ của bạn.'
                onChange={formik.handleChange}
            />

            <div className="flex items-center justify-between w-full h-full">
                {
                    image ?
                        <label
                            for="post_img"
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
                            for="post_img"
                            className="flex flex-col items-center justify-center w-full h-80 rounded-lg bg-bg_popup_secondary border-dashed cursor-pointer bg-origin-conten">

                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Camera size={50} strokeWidth={1} color='#000000' />
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Nhấn vào để chọn ảnh</span> </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">JPEG, PNG, JPG  </p>
                            </div>

                            <input
                                id="post_img"
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleInputFile}
                            />
                        </label>
                }
            </div>

            <Button
                type="submit"
                radius="sm"
                isLoading={isLoading}
                spinner={
                    <svg
                        className="animate-spin h-5 w-5 text-current"
                        fill="none"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            fill="currentColor"
                        />
                    </svg>
                }
                onClick={handleCreatePost}
                className='text-lg font-mono w-1/2'>
                Đăng
            </Button>
        </form>
    )
}

export default FormUploadImageFile
