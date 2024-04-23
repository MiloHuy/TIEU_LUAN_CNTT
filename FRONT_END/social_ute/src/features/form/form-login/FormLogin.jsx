import { setInfoUser } from 'app/slice/user/user.slice'
import clsx from 'clsx'
import { Button } from 'components/button'
import Input from 'components/input'
import LoadingDotV2 from 'components/loading/loading-dot-v2'
import { SSOCOOKIES } from 'constants/app.const'
import { ERROR_LOGIN } from 'constants/error.const'
import { USERCOOKIES } from 'constants/user.const'
import { useFormik } from 'formik'
import Cookies from 'js-cookie'
import { Eye, Loader2, Smartphone } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login } from 'services/auth.svc'
import { errorHandler } from 'utils/error-response.utils'
import { genSchemaFormLogin } from './schema'
import { genLabelFormLogin } from './utils'

const FormLogin = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setIsLoading] = useState(false)

  const formLabel = useMemo(() => genLabelFormLogin(), [])
  const formLoginSchema = useMemo(() => genSchemaFormLogin(formLabel), [formLabel])

  const [formLogin, setFormLogin] = useState({
    phone_number: '',
    pass_word: ''
  })

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
      setIsLoading(true)
      await formLoginSchema.validate(values)
      const userData = await login(values)
      dispatch(setInfoUser({ ...userData }))

      const { role_id } = userData.user
      handleCheckRole(role_id)

      Cookies.set(SSOCOOKIES.access, userData.token, { expires: 1 })
      Cookies.set(USERCOOKIES.userID, userData.user._id, { expires: 1 })

      setIsLoading(false)

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
      setIsLoading(false)
      errorHandler(err, ERROR_LOGIN)
    }
  }

  const handleInput = (e) => {
    setFormLogin({ ...formLogin, [e.target.name]: e.target.value })
  }

  const formik = useFormik({
    initialValues: formLogin,
    validationSchema: formLoginSchema,
    handleChange: { handleInput },
    handleSubmit: { handleSubmitLogin }
  })

  const { values, errors } = formik

  return (
    <form
      className={clsx('h-[80vh] min-w-[35vw] flex flex-col items-center justify-between p-4 gap-4', props.className)}
      onSubmit={formik.handleSubmit}
    >
      {
        loading ?
          <div className='absolute top-1/2 right-1/2 w-full'>
            <LoadingDotV2 />
          </div > : null
      }

      <h1 className='text-[40px] text-black font-extrabold font-quick_sans text-center'>
        ĐĂNG NHẬP
      </h1>

      <div className='w-full px-3 flex flex-col gap-8 justify-center items-center'>
        <Input
          name='phone_number'
          disabled={loading}
          type='text'
          className='text-sm font-quick_sans mx-0 rounded-sm '
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
          disabled={loading}
          className='text-sm  mx-0 rounded-sm'
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
          onClick={handleSubmitLogin}
          className='w-3/5 rounded-[40px] text-lg bg-[#1C30E3]'>
          {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : ''}
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
