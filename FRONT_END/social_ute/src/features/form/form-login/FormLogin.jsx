import { setInfoUser } from 'app/slice/user/user.slice'
import clsx from 'clsx'
import { Button } from 'components/button'
import Input from 'components/input'
import { SSOCOOKIES } from 'constants/app.const'
import { ERROR_LOGIN } from 'constants/error.const'
import { USERCOOKIES } from 'constants/user.const'
import { useFormik } from 'formik'
import Cookies from 'js-cookie'
import { Eye, Smartphone } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
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
            className={clsx('h-full w-full flex flex-col items-center justify-center gap-y-8 overflow-hidden', props.className)}
            onSubmit={formik.handleSubmit}
        >
            <h1 className='text-[40px] text-black font-extrabold font-quick_sans text-center'>
                ĐĂNG NHẬP
            </h1>

            <div className='w-full px-3 flex flex-col  gap-8 justify-center items-center'>
                <Input
                    name='phone_number'
                    type='text'
                    className='text-sm font-nunito_sans mx-0 rounded-sm w-3/4'
                    errorMessage={errors?.phone_number}
                    placeholder='Vui lòng nhập số điện thoại'
                    onChange={formik.handleChange}
                    endContent={
                        <Smartphone size={27} strokeWidth={1.25} />
                    }
                />

                <Input
                    name='pass_word'
                    type='password'
                    className='text-sm  mx-0 rounded-sm w-3/4'
                    placeholder="Mật khẩu"
                    onChange={formik.handleChange}
                    endContent={
                        <Eye size={27} strokeWidth={1.25} />
                    }
                />
            </div>

            <div className='flex gap-2 justify-center w-3/4 px-3'>
                <Button
                    radius='sm'
                    className='w-3/5 rounded-[40px] bg-[#1F1F24]'>
                    <Link
                        className='text-lg font-questrial font-bold'
                        to="/register"
                    >
                        Đăng ký
                    </Link>
                </Button>

                <Button
                    radius='sm'
                    isDisabled={isDisabled}
                    onClick={handleSubmitLogin}
                    className='w-3/5 rounded-[40px] text-lg bg-[#1C30E3]'>
                    Đăng nhập
                </Button>
            </div>


            <div className='font-quick_sans text-center text-lg grid gap-2 font-bold'>
                <Link to='/forgot_password'>
                    <p className='hover:underline cursor-pointer'>
                        Bạn quên mật khẩu sao?
                    </p>
                </Link>

                <p className='cursor-pointer'>
                    Trở về trang chủ
                </p>
            </div>
        </form>
    )
}

export default FormLogin
