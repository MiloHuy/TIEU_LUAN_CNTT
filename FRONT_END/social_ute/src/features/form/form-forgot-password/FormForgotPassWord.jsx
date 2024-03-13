import { Button } from "@nextui-org/react";
import clsx from "clsx";
import Input from "components/input";
import { ERROR_FORGOT_PASSWORD, ERROR_SYSTEM } from "constants/error.const";
import { useFormik } from "formik";
import { Mail, Smartphone } from 'lucide-react';
import { useEffect, useMemo, useState } from "react";
import { toast } from 'react-toastify';
import { forgotPassword } from "services/auth.svc";
import { checkCodeInArray } from "utils/code-error.utils";
import { object, string } from 'yup';

const FormForgotPassWord = ({ className, handleNextForm, stepForm, formValues, setFormValues }) => {
    const [formForgotPassWord, setformForgotPassWord] = useState(formValues)
    const [checkLoadOrDisable, setCheckLoadOrDisable] = useState(
        {
            isLoading: false,
            isDisabled: true,
        }
    )

    const formLabel = useMemo(() => ({
        phone_number: 'Số điện thoại',
        gmail: 'Mail',
    }), [])

    const formForgotPassWordSchema = useMemo(() => {
        return object().shape({
            phone_number: string().typeError(`${formLabel.phone_number}`).required(`${formLabel.phone_number} is required`).min(10, "Hãy điền đủ 10 số.").max(10, "Không điền quá 10 số."),
            gmail: string().typeError(`${formLabel.gmail}`).required(`${formLabel.gmail} is required`),
        })
    }, [formLabel])

    const handleInput = (e) => {
        setformForgotPassWord({ ...formForgotPassWord, [e.target.name]: e.target.value })
    }

    const checkStepToNextForm = useMemo(() => {
        switch (stepForm) {
            case 0:
                return ''
            case 1:
                return '-translate-x-full min-w-[55vw]'
            case 2:
                return '-translate-x-[100vw] min-w-[55vw]'
            default:
                break
        }
    }, [stepForm])

    const handleSubitFormForgotPassWord = async () => {
        try {
            setCheckLoadOrDisable((prev) => ({
                ...prev,
                isLoading: true
            }))
            const res = await forgotPassword(values)
            setCheckLoadOrDisable((prev) => ({
                ...prev,
                isLoading: false
            }))

            if (res.data.success === true) {
                setFormValues({
                    phone_number: values.phone_number,
                    gmail: values.gmail,
                })
                handleNextForm && handleNextForm()
            }
        }
        catch (err) {
            setCheckLoadOrDisable((prev) => ({
                ...prev,
                isLoading: false
            }))
            if (err && err.response && err.response.code) {
                const { code } = err.response.data
                const messageError = checkCodeInArray(ERROR_FORGOT_PASSWORD, code)
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
        initialValues: formForgotPassWord,
        validationSchema: formForgotPassWordSchema,
        handleChange: { handleInput },
        handleSubmit: { handleSubitFormForgotPassWord }
    })

    const { values, errors } = formik

    useEffect(() => {
        if (Object.keys(errors).length === 0) {
            setCheckLoadOrDisable((prev) => ({
                ...prev,
                isDisabled: false
            }))
        }
        else {
            setCheckLoadOrDisable((prev) => ({
                ...prev,
                isDisabled: true
            }))
        }
    }, [errors])

    return (
        <div
            className={clsx(
                'flex flex-col gap-5 items-center justify-center p-4 min-w-[35vw] min-h-[50vh]',
                ` ${checkStepToNextForm}transform duration-500 ease-in`,
                className)}
        >
            <h1 className='text-center text-xl text-black font-quick_sans font-bold'>
                Quên mật khẩu
            </h1>

            <Input
                value={values.phone_number}
                onChange={formik.handleChange}
                name='phone_number'
                errorMessage={errors?.phone_number}

                placeholder="Nhập số điện thoại của bạn"
                className='w-3/4 text-lg font-quick_sans text-black'
                endContent={
                    <Smartphone size={27} strokeWidth={1.25} />
                }
            />

            <Input
                value={values.gmail}
                onChange={formik.handleChange}
                name='gmail'
                errorMessage={errors?.gmail}

                placeholder="Nhập gmail của bạn"
                className='w-3/4 text-lg font-quick_sans text-black'
                endContent={
                    <Mail size={27} strokeWidth={1.25} />
                }
            />

            <div className="w-3/4 grid grid-cols-2 justify-center items-center px-3 gap-3">
                <Button
                    radius="sm"
                    className="text-lg text-white font-bold font-quick_sans bg-[#3C43B7] rounded-lg"
                    onClick={handleSubitFormForgotPassWord}
                >
                    Đăng nhập
                </Button>

                <Button
                    radius="sm"
                    isLoading={checkLoadOrDisable.isLoading}
                    isDisabled={checkLoadOrDisable.isDisabled}
                    type="submit"

                    className="text-lg text-white font-bold font-quick_sans  bg-[#3C43B7] rounded-lg"
                    onClick={handleSubitFormForgotPassWord}
                >
                    Tiếp theo
                </Button>
            </div>
        </div>
    )
}

export default FormForgotPassWord
