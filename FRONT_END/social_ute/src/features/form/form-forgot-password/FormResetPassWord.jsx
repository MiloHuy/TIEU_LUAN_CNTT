import { Button } from "@nextui-org/react";
import clsx from "clsx";
import Input from "components/input";
import { useFormik } from "formik";
import { useMemo, useState } from "react";

const FormResetPassWord = ({ className, stepForm }) => {
    const intiFormResetPassWord = {
        new_passwords: '',
        confirm_passwords: ''
    }
    const [formResetPassWord, setFormResetPassWord] = useState(intiFormResetPassWord)

    const handleInput = (e) => {
        setFormResetPassWord({ ...formResetPassWord, [e.target.name]: e.target.value })
    }
    const checkStepToNextForm = useMemo(() => {
        switch (stepForm) {
            case 0:
                return 'translate-x-[700px]'
            case 1:
                return 'translate-x-[700px]'
            case 2:
                return '-translate-x-[1170px]'
            default:
                break
        }
    }, [stepForm])

    const handleSubitFormResetPassWord = async () => {
        // try {
        //     setCheckLoadOrDisable((prev) => ({
        //         ...prev,
        //         isLoading: true
        //     }))
        //     await forgotPassword(values)
        //     setCheckLoadOrDisable((prev) => ({
        //         ...prev,
        //         isLoading: false
        //     }))
        //     handleNextForm && handleNextForm()
        // }
        // catch (err) {
        //     setCheckLoadOrDisable((prev) => ({
        //         ...prev,
        //         isLoading: false
        //     }))
        //     const { code } = err.response.data
        //     const messageError = checkCodeInArray(ERROR_FORGOT_PASSWORD, code)
        //     toast.error(messageError, {
        //         position: "bottom-right",
        //         autoClose: 1000,
        //         hideProgressBar: true,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //         theme: "light",
        //     });
        // }
    }

    const formik = useFormik({
        initialValues: formResetPassWord,
        // validationSchema: formForgotPassWordSchema,
        handleChange: { handleInput },
        // handleSubmit: { handleSubitFormForgotPassWord }
    })

    const { values, errors } = formik

    return (
        <div className={
            clsx(
                'relative flex flex-col gap-5 items-center justify-center p-4 min-w-[35vw] min-h-[50vh]',
                `${checkStepToNextForm} transform duration-500 ease-in`,
                className
            )}
        >
            <h1 className='text-center text-xl text-black font-quick_sans font-bold'>
                Quên mật khẩu
            </h1>

            <div className='flex flex-col w-full items-center justify-center gap-3'>
                <Input
                    // isRequired
                    type="password"
                    name='new_passwords'
                    value={values['new_passwords']}
                    placeholder='Nhập mật khẩu mới của bạn'
                    defaultValue=""
                    className="w-4/5 text-lg font-quick_sans"
                    onChange={formik.handleChange}
                />

                <Input
                    // isRequired
                    type="password"
                    name='confirm_passwords'
                    value={values['confirm_passwords']}
                    placeholder='Xác nhận mật khẩu'
                    defaultValue=""
                    className="w-4/5 text-lg font-quick_sans"
                    onChange={formik.handleChange}
                />
            </div>

            <Button
                radius="sm"
                // isLoading={checkLoadOrDisable.isLoading}
                // isDisabled={checkLoadOrDisable.isDisabled}
                type="submit"

                className="text-lg text-white font-bold font-quick_sans  bg-[#3C43B7] rounded-lg"
                onClick={handleSubitFormResetPassWord}
            >
                Tiếp theo
            </Button>
        </div>
    )
}

export default FormResetPassWord
