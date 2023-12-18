import { Button, Input } from "@nextui-org/react";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createPost } from "services/post.svc";

const FormUploadImage = () => {
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

    const handleInputFile = async (e) => {
        const ListFile = e.target.files

        if (ListFile.length > 0) {
            // setFiles({ ...ListFile[0] })
            const reader = new FileReader()
            reader.readAsDataURL(e.target.files[0])
            reader.onload = () => {
                console.log("Reading file " + reader.result)
                setSelectFiles(reader.result)
            }
            reader.onerror = error => {
                console.log("error reading file " + error)
            }

            setImage(URL.createObjectURL(ListFile[0]))
        }
    }

    const handleCreatePost = async () => {
        try {
            setIsLoading(true)
            values['post_img'] = selectFiled

            // const formData = new FormData()
            // formData.append('post_description', values['post_description'])
            // formData.append('post_img', values['post_img'])

            await createPost(values)

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
        }
        catch (err) {
            console.log("error", err.response);

            toast.error('Đăng bài viết thất bại!!!', {
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

    console.log('files: ' + selectFiled)

    return (
        <form className='h-[350px] max-h-max justify-start flex flex-col items-center'>
            {
                image ?
                    <img
                        loading="lazy"
                        src={selectFiled}
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
                isLoading={isLoading}
                onClick={handleCreatePost}
                className='text-sm font-merriweather w-2/3'>
                Upload
            </Button>
        </form>
    )
}

export default FormUploadImage
