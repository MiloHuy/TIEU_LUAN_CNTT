import { Button, Input } from "@nextui-org/react";
import clsx from "clsx";
import { useFormik } from "formik";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { changePassWord } from "services/me.svc";
import { object, string } from "yup";

const FormChangePassWord = () => {
    const [isLoading, setIsLoading] = useState(false)

    const initFormChangePassWord = {
        pass_word: '',
        new_password: '',
        confirm: ''
    }

    const [FormChangePassWord, setFormChangePassWord] = useState(initFormChangePassWord)

    const handleInput = (e) => {
        setFormChangePassWord({ ...FormChangePassWord, [e.target.name]: e.target.value })
    }

    const formLabel = useMemo(() => ({
        pass_word: 'Password',
        new_password: 'New password',
        confirm: 'Confirm password',
    }), [])

    const FormChangePassWordSchema = useMemo(() => {
        return object().shape({
            pass_word: string(),
            new_password: string(),
            confirm: string()
        })
    }, [])

    const handleChangePassword = async () => {
        try {
            setIsLoading(true)
            await changePassWord(values)


            toast.success('Thay đổi mật khẩu thành công!!!', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            setIsLoading(false)
        }
        catch (err) {
            console.log("Error: ", err.response)
            setIsLoading(false)

            toast.error('Thay đổi mật khẩu thất bại!!!', {
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
        initialValues: FormChangePassWord,
        validationSchema: FormChangePassWordSchema,
        handleChange: { handleInput },
        handleSubmit: { handleChangePassword }
    })
    const { values, errors } = formik

    return (
        <form
            className={clsx('flex flex-col gap-2 items-center justify-center p-4 w-full h-full ')}
            onSubmit={formik.handleSubmit}
        >
            <h1 className="text-lg font-bold font-merriweather text-center text-white dark:text-black">
                Thay đổi mật khẩu
            </h1>

            <Input
                isRequired
                type="password"
                name='pass_word'
                variant="bordered"
                label={formLabel.pass_word}
                value={values['pass_word']}
                className="w-full text-white"
                onChange={formik.handleChange}
            />

            <Input
                isRequired
                type="password"
                variant="bordered"
                name='new_password'
                label={formLabel.new_password}
                value={values['new_password']}
                className="w-full text-white"
                onChange={formik.handleChange}
            />

            <Input
                isRequired
                type="password"
                name='confirm'
                variant="bordered"
                label={formLabel.confirm}
                className="w-full text-white"
                onChange={formik.handleChange}
            />

            <Button
                isLoading={isLoading}
                className="w-3/4 text-sm font-merriweather"
                onClick={handleChangePassword}
                type='submit'
            >Cập nhật
            </Button>
        </form >
    )
}

export default FormChangePassWord
