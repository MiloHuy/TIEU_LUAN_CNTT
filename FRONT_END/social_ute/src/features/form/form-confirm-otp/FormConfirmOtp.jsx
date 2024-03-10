import clsx from "clsx"
import { Button } from "components/button"
import Input from "components/input"
import { timeCountDown } from "constants/app.const"
import { ERROR_FORGOT_PASSWORD, ERROR_SYSTEM } from "constants/error.const"
import { useEffect, useMemo, useState } from "react"
import { toast } from 'react-toastify'
import { verifyOtp } from "services/auth.svc"
import { checkCodeInArray } from "utils/code-error.utils"

const FormConfirmOtp = ({ title, formValues, className, stepForm, handleNextForm, setFormValues }) => {
  const [countDown, setCountDown] = useState(timeCountDown.otp)
  const [isLoading, setIsloading] = useState(false)
  const [otpValue, setOtp] = useState()

  const handleChangeInput = (e) => {
    setOtp(e.target.value);
  }

  const checkStepToNextForm = useMemo(() => {
    switch (stepForm) {
      case 0:
        return 'translate-x-full'
      case 1:
        return '-translate-x-0'
      case 2:
        return `-translate-x-[100vw]`
      default:
        break
    }
  }, [stepForm])

  const handleVerifyOtp = async () => {
    try {
      setIsloading(true)
      const res = await verifyOtp({
        ...formValues,
        otp: otpValue
      })
      setIsloading(false)

      if (res.data.success === true) {
        handleNextForm && handleNextForm()

        if (setFormValues) setFormValues((prev) => ({
          ...prev,
          resetPassWordToken: res.data.resetPasswordToken
        }))
      }
    }
    catch (err) {
      setIsloading(false)
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

  useEffect(() => {
    if (countDown > 0 && stepForm === 1) {
      const interval = setInterval(() => {
        setCountDown(countDown - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [countDown, stepForm]);

  return (
    <div className={clsx(
      'absolute top-0 right-0 min-w-[35vw] min-h-[50vh]',
      `${checkStepToNextForm} transform duration-500 ease-in `,
      className
    )}>
      <div className='flex flex-col items-center justify-center gap-4 min-h-[50vh]'>
        <h1 className='text-center text-xl text-black font-quick_sans font-bold'>
          {title ? title : ''}
        </h1>

        <Input
          value={otpValue}
          placeholder="Nhập mã OTP"
          onChange={handleChangeInput}
          className='w-3/4 text-lg font-quick_sans text-black'
        />

        <p className="text-center text-xl text-black font-quick_sans">
          <span className="text-red">
            {countDown}s
          </span> để nhập mã từ email
        </p>

        <div className="w-full flex justify-center">
          <Button
            radius="sm"
            isLoading={isLoading}
            className="text-lg text-white font-bold font-quick_sans w-1/2 bg-[#3C43B7] rounded-lg"
            type='submit'
            onClick={handleVerifyOtp}
          >
            Tiếp theo
          </Button>
        </div>
      </div>
    </div>
  )
}

export default FormConfirmOtp
