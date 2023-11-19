import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Button, Input } from '@nextui-org/react'
import { setCredentials } from 'app/slice/auth/auth.slice'
import clsx from 'clsx'
import { SSOCOOKIES } from 'constants/app.const'
import { useFormik } from 'formik'
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { login } from 'services/auth.svc'
import { object, string } from 'yup'

const FormLogin = (props) => {
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()

    const initFormLogin = {
        phone_number: '',
        pass_word: ''
    }
    const [formLogin, setFormLogin] = useState(initFormLogin)

    const dispatch = useDispatch()

    useEffect(() => {
        setErrMsg('')
    }, [formLogin.phone_number, formLogin.pass_word])

    const handleSubmitLogin = async (e) => {
        e.preventDefault()

        try {
            const userData = await login(values)
            console.log('User data: ', userData)
            dispatch(setCredentials({ ...userData, values }))
            Cookies.set(SSOCOOKIES.access, userData.data.token, { expires: 1 })

            toast.success('Đăng nhập thành công!!!', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setTimeout(() => { navigate('/welcome') }, 3000)

        } catch (err) {
            console.error(err)
        }
    }

    const handleInput = (e) => {
        setFormLogin({ ...formLogin, [e.target.name]: e.target.value })
    }

    const handleOpenLogin = () => {
        props.handleFunction('hidden')
    }

    const formLabel = useMemo(() => ({
        phone_number: 'Phone',
        pass_word: 'Password',
    }), [])

    const formLoginSchema = useMemo(() => {
        return object().shape({
            phone_number: string().typeError(`${formLabel.phone_number}`).required(`${formLabel.phone_number} is required`).max(10, { message: "Hãy điền đủ 10 số.", excludeEmptyString: false }),
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
    console.log("Values:", Object.values(values))

    return (
        <form
            className={clsx('h-full w-full flex flex-col items-center justify-center', props.className)}
            onSubmit={formik.handleSubmit}
        >

            <h1 className='text-lg text-blue-950 font-bold font-merriweather text-center'>LOGIN</h1>

            <Input
                name='phone_number'
                type='text'
                className='py-[10px] px-[15px] text-sm my-[8px] mx-0 rounded-sm w-full'
                errorMessage={errors.phone_number?.message}
                placeholder='Please enter a phone number'
                onChange={formik.handleChange}
            />

            <Input
                name='pass_word'
                type='password'
                className='py-[10px] px-[15px] text-sm my-[8px] mx-0 rounded-sm w-full'
                placeholder="Password"
                onChange={formik.handleChange}
            />

            <div className='flex flex-col gap-2 justify-center'>
                <Button onClick={handleSubmitLogin} className='text-sm font-merriweather'>LOGIN</Button>
                <div className='grid grid-cols-4 gap-2 mt-2'>
                    <Link className='text-sm col-span-1 font-merriweather' onClick={handleOpenLogin} href="#">SIGN UP</Link>

                    <Link className='text-sm col-span-3 font-merriweather' href="#">FORGET YOUR PASSWORD?</Link>
                </div>

            </div>
        </form>
    )
}

export default FormLogin
