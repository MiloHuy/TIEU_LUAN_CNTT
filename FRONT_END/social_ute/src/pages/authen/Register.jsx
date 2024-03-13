import clsx from "clsx"
import FormConfirmOtp from "features/form/form-confirm-otp"
import FormRegister from "features/form/form-register"
import { useMemo, useState } from "react"

const Register = () => {
    const [stepForm, handeStepForm] = useState(0)

    const handleNextForm = () => {
        if (stepForm <= 1)
            handeStepForm(stepForm + 1)
    }

    const transformNextForm = useMemo(() => {
        switch (stepForm) {
            case 0:
                return 'max-w-[55vw] max-h-[75vh]'
            case 1:
                return 'max-w-[35vw] max-h-[50vh]'
            default:
                break
        }
    }, [stepForm])

    const multipleForm = [
        <FormRegister
            stepForm={stepForm}
            handleNextForm={handleNextForm}
        />,
        <FormConfirmOtp
            title='Đăng ký'
            stepForm={stepForm}
        />,
    ]

    return (
        <div className='flex justify-center items-center w-screen h-screen bg-bg_hcmute_01 bg-cover'>
            <div className={clsx(
                'absolute rounded-[10px] border bg-white/45 backdrop-blur-sm opacity-100 shadow-lg overflow-hidden',
                `${transformNextForm} transform duration-500 ease-in`
            )}
            >
                <div className='relative flex'>
                    {multipleForm.map((form) => {
                        return form
                    })}

                </div>
            </div>
        </div >
    )
}

export default Register
