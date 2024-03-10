import { Button } from "@nextui-org/react";
import clsx from "clsx";
import Input from "components/input";
import { ERROR_FORGOT_PASSWORD, ERROR_SYSTEM } from "constants/error.const";
import { useFormik } from "formik";
import { useMemo, useState } from "react";
import { toast } from 'react-toastify';
import { resetPassWord } from "services/auth.svc";
import { checkCodeInArray } from "utils/code-error.utils";

const FormResetPassWord = ({ className, stepForm, resetPassWordToken }) => {
  const [formResetPassWord, setFormResetPassWord] = useState({
    new_password: '',
    confirm_passwords: ''
  })
  const [isLoading, setIsloading] = useState(false)

  const handleInput = (e) => {
    setFormResetPassWord({ ...formResetPassWord, [e.target.name]: e.target.value })
  }

  const checkStepToNextForm = useMemo(() => {
    switch (stepForm) {
      case 0:
        return ''
      case 1:
        return '-translate-x-0'
      case 2:
        return '-translate-x-full'
      default:
        break
    }
  }, [stepForm])

  const handleSubitFormResetPassWord = async () => {
    try {
      setIsloading(true)
      await resetPassWord({
        new_password: values.new_password
      }, resetPassWordToken)

      setIsloading(false)

      toast.success('Đổi mật khẩu thành công!!!', {
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
      setIsloading(false)

      if (err && err.response && err.response.data) {
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
    initialValues: formResetPassWord,
    // validationSchema: formForgotPassWordSchema,
    handleChange: { handleInput },
    // handleSubmit: { handleSubitFormForgotPassWord }
  })

  const { values, errors } = formik

  return (
    <div className={
      clsx(
        'relative top-0 right-0 min-w-[35vw] min-h-[50vh]',
        `${checkStepToNextForm} transform duration-500 ease-in`,
        className
      )}>
      <div className='relative flex flex-col gap-5 items-center justify-center min-w-[35vw] min-h-[50vh]'>
        <h1 className='text-center text-xl text-black font-quick_sans font-bold'>
          Quên mật khẩu
        </h1>

        <div className='flex flex-col w-full items-center justify-between gap-3 '>
          <Input
            // isRequired
            type="password"
            name='new_password'
            value={values['new_password']}
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
          isLoading={isLoading}
          // isDisabled={checkLoadOrDisable.isDisabled}
          type="submit"

          className="text-lg text-white font-bold font-quick_sans  bg-[#3C43B7] rounded-lg"
          onClick={handleSubitFormResetPassWord}
        >
          Tiếp theo
        </Button>
      </div>
    </div>
  )
}

export default FormResetPassWord
