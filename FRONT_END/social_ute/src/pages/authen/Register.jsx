import clsx from "clsx"
import FormConfirmOtp from "features/form/form-confirm-otp"
import FormRegister from "features/form/form-register"
import { useState } from "react"

const Register = () => {
    const [nextForm, setNextPage] = useState(false)

    const handleNextPage = () => {
        setNextPage(!nextForm)
    }

    return (
        <div className='flex justify-center items-center w-screen h-screen bg-bg_hcmute_01 bg-cover'>
            <div className={clsx(
                'absolute rounded-[10px] border bg-white/45 backdrop-blur-sm opacity-100 shadow-lg overflow-hidden',
                `${nextForm === true ? 'max-w-[35vw] max-h-[50vh]' : 'max-w-[55vw] max-h-[75vh]'} transform duration-500 ease-in`
            )}
            >
                <div className='relative flex gap-4'>
                    <FormRegister
                        nextForm={nextForm}
                        handleNextPage={handleNextPage}
                    />

                    <FormConfirmOtp
                        title='Đăng ký'
                        nextForm={nextForm}
                    />
                </div>
            </div>
        </div >
    )
}

export default Register
