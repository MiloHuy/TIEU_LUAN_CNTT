import clsx from "clsx"
import FormConfirmOtp from "features/form/form-confirm-otp"
import FormForgotPassword from "features/form/form-forgot-password"
import FormResetPassWord from "features/form/form-forgot-password/FormResetPassWord"
import { useMemo, useState } from "react"

const ForgotPassword = () => {
  const [stepForm, setStepForm] = useState(0)

  const [formValues, setFormValues] = useState({
    phone_number: '',
    gmail: '',
    resetPassWordToken: ''
  })

  const handleNextForm = () => {
    if (stepForm <= 2)
      setStepForm(stepForm + 1)
  }

  const transformNextForm = useMemo(() => {
    switch (stepForm) {
      case 0:
        return 'max-w-[35vw] max-h-[50vh]'
      case 1:
        return 'max-w-[35vw] max-h-[55vh]'
      case 2:
        return 'max-w-[35vw] max-h-[50vh]'
      default:
        break
    }
  }, [stepForm])

  const multipleForm = [
    <FormForgotPassword
      formValues={formValues}
      setFormValues={setFormValues}
      stepForm={stepForm}
      handleNextForm={handleNextForm}
    />,

    <FormConfirmOtp
      title='Quên mật khẩu'
      formValues={formValues}
      stepForm={stepForm}
      setFormValues={setFormValues}
      handleNextForm={handleNextForm}
    />,

    <FormResetPassWord
      resetPassWordToken={formValues.resetPassWordToken}
      stepForm={stepForm} />
  ]

  return (
    <div className='flex justify-center items-center w-screen h-screen bg-bg_hcmute_01 bg-cover'>
      <div className={clsx(
        'asbolute rounded-[20px] border bg-white/45 backdrop-blur-sm opacity-100 shadow-lg overflow-hidden',
        `${transformNextForm}' transform duration-500 ease-in`
      )}>
        <div className='flex'>
          {multipleForm.map((form) => { return form })}
        </div>
      </div>
    </div >
  )
}

export default ForgotPassword
