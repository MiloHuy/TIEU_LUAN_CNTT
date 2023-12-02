import { Button, Input } from "@nextui-org/react";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createPost } from "services/post.svc";

const FormUploadImage = () => {
    const [files, setFiles] = useState('')

    const [image, setImage] = useState()

    const initFormUpload = {
        post_description: '',
        post_img: ''
    }
    const [formUpload, setFormUpload] = useState(initFormUpload)

    const handleInput = (e) => {
        setFormUpload({ ...formUpload, [e.target.name]: e.target.value })
    }

    const toBase64 = (file) => new Promise((resolve, reject) => {
        const render = new FileReader()
        render.readAsDataURL(file)
        render.onLoad = () => resolve(render.result)
        render.onerror = (error) => reject(error)
    })

    const handleInputFile = async (e) => {
        const ListFile = e.target.files

        if (ListFile.length > 0) {
            setFiles({ ...ListFile[0] })
            setImage(URL.createObjectURL(ListFile[0]))
        }
    }

    const handleCreatePost = async () => {
        try {
            values['post_img'] = files

            const formData = new FormData()
            formData.append('post_description', values['post_description'])
            formData.append('post_img', values['post_img'])

            await createPost(formData)

            toast.success('Đăng bài viết thành công!!!', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        catch (err) {
            console.log("error", err.response);

            toast.error('Đăng bài viết thất bại!!!', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
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

    console.log('files: ' + files)

    return (
        <form className='h-[300px]'>
            {
                image ?
                    <img
                        src={image}
                        alt='img'
                        className="h-2/3 w-full"
                    />
                    :

                    <Input
                        name='post_img'
                        type="file"
                        onChange={handleInputFile}
                        accept="image/*"
                        variant="bordered"
                    />}

            <Input
                name='post_description'
                type='text'
                variant='underlined'
                className='py-[10px] px-[15px] text-sm my-[8px] mx-0 rounded-sm w-full placeholder:text-black'
                placeholder='Hãy nói cảm nghĩ của bạn.'
                onChange={formik.handleChange}
            />

            <Button
                onClick={handleCreatePost}
                className='text-sm font-merriweather'>
                Upload
            </Button>

        </form>
    )
}

export default FormUploadImage
