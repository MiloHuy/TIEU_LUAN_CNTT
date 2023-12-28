import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Button, Input } from '@nextui-org/react'
import { setInfoUser } from 'app/slice/user/user.slice'
import clsx from 'clsx'
import { SSOCOOKIES } from 'constants/app.const'
import { ERROR_LOGIN } from 'constants/error.const'
import { USERCOOKIES } from 'constants/user.const'
import { useFormik } from 'formik'
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { login } from 'services/auth.svc'
import { checkCodeInArray } from 'utils/code-error.utils'
import { object, string } from 'yup'

const FormLogin = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [userData, setUserData] = useState()
    const [isDisabled, setIsDisabled] = useState(true)

    const initFormLogin = {
        phone_number: '',
        pass_word: ''
    }
    const [formLogin, setFormLogin] = useState(initFormLogin)

    const handleCheckRole = (role) => {
        if (role === 1) {
            navigate('/welcome')
        }
        if (role === 0) {
            navigate('/manage')
        }
    }

    const handleSubmitLogin = async (e) => {
        e.preventDefault()

        try {
            const userData = await login(values)
            console.log('User data: ', userData)
            setUserData(userData.data)
            dispatch(setInfoUser({ ...userData }))

            const { role_id } = userData.user

            handleCheckRole(role_id)

            Cookies.set(SSOCOOKIES.access, userData.token, { expires: 1 })
            Cookies.set(USERCOOKIES.userID, userData.user._id, { expires: 1 })

            toast.success('Đăng nhập thành công!!!', {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            // setTimeout(() => { navigate('/welcome') }, 2000)

        } catch (err) {
            console.error(err)

            const { code } = err.response.data

            const messageError = checkCodeInArray(ERROR_LOGIN, code)

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

    const handleInput = (e) => {
        setFormLogin({ ...formLogin, [e.target.name]: e.target.value })
    }

    const handleOpenLogin = () => {
        props.handleFunction('hidden')
    }

    const formLabel = useMemo(() => ({
        phone_number: 'Số điện thoại',
        pass_word: 'Mật khẩu',
    }), [])

    const formLoginSchema = useMemo(() => {
        return object().shape({
            phone_number: string().typeError(`${formLabel.phone_number}`).required(`${formLabel.phone_number} is required`).min(10, "Hãy điền đủ 10 số.").max(10, "Không điền quá 10 số."),
            pass_word: string().typeError(`${formLabel.pass_word}`).required(`${formLabel.pass_word} is required`),
        })
    }, [formLabel])

    const formik = useFormik({
        initialValues: formLogin,
        validationSchema: formLoginSchema,
        handleChange: { handleInput },
        handleSubmit: { handleSubmitLogin }
    })

    const { values, errors } = formik

    useEffect(() => {
        if (Object.keys(errors).length === 0) {
            setIsDisabled(false)
        }
        else {
            setIsDisabled(true)
        }
    }, [errors])

    return (
        <form
            className={clsx('h-full w-full flex flex-col items-center justify-center', props.className)}
            onSubmit={formik.handleSubmit}
        >

            <h1 className='text-lg text-blue-950 font-bold font-merriweather text-center'>Đăng nhập</h1>

            <Input
                name='phone_number'
                type='text'
                className='py-[10px] px-[15px] text-sm my-[8px] mx-0 rounded-sm w-full'
                errorMessage={errors?.phone_number}
                placeholder='Vui lòng nhập số điện thoại'
                onChange={formik.handleChange}
            />

            <Input
                name='pass_word'
                type='password'
                className='py-[10px] px-[15px] text-sm my-[8px] mx-0 rounded-sm w-full'
                placeholder="Mật khẩu"
                onChange={formik.handleChange}
            />

            <div className='flex gap-2 justify-center w-4/5'>
                <Button
                    className=' w-4/5'>
                    <Link className='text-sm col-span-1 font-merriweather' onClick={handleOpenLogin} href="#">Đăng ký</Link>
                </Button>

                <Button
                    isDisabled={isDisabled}
                    onClick={handleSubmitLogin}
                    className='text-sm font-merriweather w-4/5'>
                    Đăng nhập
                </Button>
            </div>
        </form>
    )
}

export default FormLogin
