import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Button, Input } from '@nextui-org/react'
import { setInfoUser } from 'app/slice/user/user.slice'
import clsx from 'clsx'
import { SSOCOOKIES } from 'constants/app.const'
import { USERCOOKIES } from 'constants/user.const'
import { useFormik } from 'formik'
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { login } from 'services/auth.svc'
import { getFullName } from 'utils/user.utils'
import { object, string } from 'yup'

const FormLogin = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [userData, setUserData] = useState()

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
            Cookies.set(USERCOOKIES.userAvatar, userData.user.avatar, { expires: 1 })
            Cookies.set(USERCOOKIES.userID, userData.user._id, { expires: 1 })
            Cookies.set(USERCOOKIES.userName, getFullName(userData.user.first_name, userData.user.last_name), { expires: 1 })

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

            toast.error('Đăng nhập thất bại!!!', {
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

            <div className='flex gap-2 justify-center w-4/5'>
                <Button className=' w-4/5'>
                    <Link className='text-sm col-span-1 font-merriweather' onClick={handleOpenLogin} href="#">SIGN UP</Link>
                </Button>

                <Button onClick={handleSubmitLogin} className='text-sm font-merriweather w-4/5'>LOGIN</Button>
            </div>
        </form>
    )
}

export default FormLogin
