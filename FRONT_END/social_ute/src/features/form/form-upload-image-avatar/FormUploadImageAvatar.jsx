import { Button } from "@nextui-org/react";
import { useFormik } from "formik";
import { Camera } from 'lucide-react';
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { uploadImageAvatar } from "services/me.svc";


const FormUploadImageAvatar = () => {
    const [selectFiled, setSelectFiles] = useState('')
    const [image, setImage] = useState()

    const [isLoading, setIsLoading] = useState(false)

    const initFormUpload = {
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

    const handleUploadImage = async () => {
        try {
            setIsLoading(true)
            values['post_img'] = selectFiled[0]

            const formData = new FormData()
            formData.append('avatar', values['post_img'])

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

            setTimeout(() => { window.location.reload() }, 2500)
        }
        catch (err) {

            console.log('error:', err)
            setIsLoading(false)

            toast.error('Thay đổi thất bại!!!', {
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
        handleSubmit: { handleUploadImage }
    })

    const { values, errors } = formik

    return (
        <form className='h-full gap-2 justify-start flex flex-col items-center'>
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
                            className="flex flex-col items-center justify-center w-full h-80 rounded-lg bg-bg_popup_secondary border-dashed cursor-pointer">

                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Camera size={50} strokeWidth={1} color='#000000' />
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span class="font-semibold">
                                        Click to upload
                                    </span> or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG  </p>
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
                onClick={handleUploadImage}
                className='text-lg font-mono w-1/2'>
                Đăng
            </Button>
        </form>
    )
}

export default FormUploadImageAvatar
